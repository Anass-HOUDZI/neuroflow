
import React, { useState, useRef } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Filter } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

type DataRow = Record<string, any>;
type ChartType = "bar" | "line" | "pie" | "scatter";

interface ChartBuilderProps {
  data: DataRow[];
  columns: string[];
  fileName: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

export default function ChartBuilder({ data, columns, fileName }: ChartBuilderProps) {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [xAxis, setXAxis] = useState<string>(columns[0] || "");
  const [yAxis, setYAxis] = useState<string>(columns[1] || "");
  const [filterColumn, setFilterColumn] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const chartRef = useRef<HTMLDivElement>(null);

  const numericColumns = columns.filter(col => 
    data.some(row => typeof row[col] === 'number')
  );

  const stringColumns = columns.filter(col => 
    data.some(row => typeof row[col] === 'string')
  );

  const getFilteredData = () => {
    if (!filterColumn || !filterValue) return data;
    return data.filter(row => 
      String(row[filterColumn]).toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

  const exportChart = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: "#ffffff",
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = `${fileName.split('.')[0]}_chart.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success("Graphique exporté avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'export");
    }
  };

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yAxis} fill="#8884d8" />
          </BarChart>
        );
      
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yAxis} stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        );
      
      case "pie":
        const pieData = filteredData.map((item, index) => ({
          name: item[xAxis],
          value: item[yAxis],
          fill: COLORS[index % COLORS.length]
        }));
        
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      
      case "scatter":
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis dataKey={yAxis} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={filteredData} fill="#8884d8" />
          </ScatterChart>
        );
      
      default:
        return null;
    }
  };

  const getUniqueValues = (column: string) => {
    return [...new Set(data.map(row => String(row[column])))].slice(0, 10);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuration du graphique</CardTitle>
          <CardDescription>
            Personnalisez votre visualisation en sélectionnant le type et les axes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Type de graphique</Label>
              <Select value={chartType} onValueChange={(value: ChartType) => setChartType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Barres</SelectItem>
                  <SelectItem value="line">Lignes</SelectItem>
                  <SelectItem value="pie">Camembert</SelectItem>
                  <SelectItem value="scatter">Nuage de points</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Axe X {chartType === "pie" ? "(Catégories)" : ""}</Label>
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {columns.map(col => (
                    <SelectItem key={col} value={col}>{col}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Axe Y {chartType === "pie" ? "(Valeurs)" : ""}</Label>
              <Select value={yAxis} onValueChange={setYAxis}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(chartType === "scatter" ? columns : numericColumns).map(col => (
                    <SelectItem key={col} value={col}>{col}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>
                <Filter className="h-4 w-4 inline mr-1" />
                Filtre
              </Label>
              <Select value={filterColumn} onValueChange={setFilterColumn}>
                <SelectTrigger>
                  <SelectValue placeholder="Aucun filtre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucun filtre</SelectItem>
                  {stringColumns.map(col => (
                    <SelectItem key={col} value={col}>{col}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filterColumn && (
            <div className="mt-4">
              <Label>Valeur du filtre</Label>
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choisir une valeur" />
                </SelectTrigger>
                <SelectContent>
                  {getUniqueValues(filterColumn).map(value => (
                    <SelectItem key={value} value={value}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Visualisation</CardTitle>
            <CardDescription>
              {filteredData.length} élément(s) affiché(s)
              {filterColumn && filterValue && ` (filtrés par ${filterColumn}: ${filterValue})`}
            </CardDescription>
          </div>
          <Button onClick={exportChart} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter PNG
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatsData } from "@/pages/StatsPro";

interface StatisticalChartsProps {
  datasets: StatsData[];
}

export default function StatisticalCharts({ datasets }: StatisticalChartsProps) {
  const [selectedChart, setSelectedChart] = useState<string>("");
  const [selectedDataset1, setSelectedDataset1] = useState<string>("");
  const [selectedDataset2, setSelectedDataset2] = useState<string>("");

  const createHistogramData = (values: number[], bins: number = 10) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binWidth = (max - min) / bins;
    
    const histogram = Array(bins).fill(0).map((_, i) => ({
      bin: `${(min + i * binWidth).toFixed(1)}-${(min + (i + 1) * binWidth).toFixed(1)}`,
      count: 0,
      binStart: min + i * binWidth
    }));
    
    values.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex].count++;
    });
    
    return histogram;
  };

  const createScatterData = (dataset1: StatsData, dataset2: StatsData) => {
    const minLength = Math.min(dataset1.values.length, dataset2.values.length);
    return Array(minLength).fill(0).map((_, i) => ({
      x: dataset1.values[i],
      y: dataset2.values[i]
    }));
  };

  const exportChart = () => {
    // Fonctionnalité d'export simplifiée
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `statspro_chart_${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  if (datasets.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Aucune donnée disponible pour les graphiques</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuration du graphique</CardTitle>
          <CardDescription>
            Choisissez le type de visualisation et les variables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type de graphique</label>
            <Select value={selectedChart} onValueChange={setSelectedChart}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="histogram">Histogramme</SelectItem>
                <SelectItem value="boxplot">Boîte à moustaches</SelectItem>
                <SelectItem value="scatter">Nuage de points</SelectItem>
                <SelectItem value="line">Graphique linéaire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {selectedChart === "scatter" ? "Variable X" : "Variable"}
            </label>
            <Select value={selectedDataset1} onValueChange={setSelectedDataset1}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une variable" />
              </SelectTrigger>
              <SelectContent>
                {datasets.map(dataset => (
                  <SelectItem key={dataset.name} value={dataset.name}>
                    {dataset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedChart === "scatter" && (
            <div>
              <label className="block text-sm font-medium mb-2">Variable Y</label>
              <Select value={selectedDataset2} onValueChange={setSelectedDataset2}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir variable Y" />
                </SelectTrigger>
                <SelectContent>
                  {datasets.filter(d => d.name !== selectedDataset1).map(dataset => (
                    <SelectItem key={dataset.name} value={dataset.name}>
                      {dataset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedChart && selectedDataset1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {selectedChart === "histogram" && "Histogramme"}
                {selectedChart === "boxplot" && "Boîte à moustaches"}
                {selectedChart === "scatter" && "Nuage de points"}
                {selectedChart === "line" && "Graphique linéaire"}
              </span>
              <Button onClick={exportChart} variant="outline" size="sm">
                Exporter PNG
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {selectedChart === "histogram" && (() => {
                  const dataset = datasets.find(d => d.name === selectedDataset1);
                  if (!dataset) return null;
                  const data = createHistogramData(dataset.values);
                  return (
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bin" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  );
                })()}

                {selectedChart === "line" && (() => {
                  const dataset = datasets.find(d => d.name === selectedDataset1);
                  if (!dataset) return null;
                  const data = dataset.values.map((value, index) => ({ index, value }));
                  return (
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="index" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                  );
                })()}

                {selectedChart === "scatter" && selectedDataset2 && (() => {
                  const dataset1 = datasets.find(d => d.name === selectedDataset1);
                  const dataset2 = datasets.find(d => d.name === selectedDataset2);
                  if (!dataset1 || !dataset2) return null;
                  const data = createScatterData(dataset1, dataset2);
                  return (
                    <ScatterChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="x" name={selectedDataset1} />
                      <YAxis type="number" dataKey="y" name={selectedDataset2} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter dataKey="y" fill="#8884d8" />
                    </ScatterChart>
                  );
                })()}

                {selectedChart === "boxplot" && (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">
                      Boîte à moustaches - Fonctionnalité à venir dans la prochaine version
                    </p>
                  </div>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

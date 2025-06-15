
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsData } from "@/pages/StatsPro";

interface DescriptiveStatsProps {
  datasets: StatsData[];
}

const calculateStats = (values: number[]) => {
  if (values.length === 0) return null;
  
  const sorted = [...values].sort((a, b) => a - b);
  const n = values.length;
  
  // Mesures de tendance centrale
  const mean = values.reduce((sum, val) => sum + val, 0) / n;
  const median = n % 2 === 0 
    ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
    : sorted[Math.floor(n/2)];
  
  // Mode (valeur la plus fréquente)
  const freq = values.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.keys(freq).filter(key => freq[Number(key)] === maxFreq).map(Number);
  const mode = modes.length === n ? null : modes[0]; // Si toutes uniques, pas de mode
  
  // Mesures de dispersion
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);
  const range = sorted[n-1] - sorted[0];
  
  // Quartiles
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;
  
  // Mesures de forme
  const skewness = (values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 3), 0) / n);
  const kurtosis = (values.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 4), 0) / n) - 3;
  
  return {
    n,
    mean,
    median,
    mode,
    variance,
    stdDev,
    range,
    min: sorted[0],
    max: sorted[n-1],
    q1,
    q3,
    iqr,
    skewness,
    kurtosis
  };
};

export default function DescriptiveStats({ datasets }: DescriptiveStatsProps) {
  if (datasets.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Aucune donnée à analyser</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {datasets.map((dataset, index) => {
        const stats = calculateStats(dataset.values);
        if (!stats) return null;

        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{dataset.name}</span>
                <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {dataset.type}
                </span>
              </CardTitle>
              <CardDescription>
                Statistiques descriptives (n = {stats.n})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tendance centrale */}
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Tendance centrale</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Moyenne :</span>
                      <span className="font-mono">{stats.mean.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Médiane :</span>
                      <span className="font-mono">{stats.median.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mode :</span>
                      <span className="font-mono">{stats.mode?.toFixed(3) || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Dispersion */}
                <div>
                  <h4 className="font-semibold mb-3 text-blue-700">Dispersion</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Écart-type :</span>
                      <span className="font-mono">{stats.stdDev.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variance :</span>
                      <span className="font-mono">{stats.variance.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Étendue :</span>
                      <span className="font-mono">{stats.range.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IQR :</span>
                      <span className="font-mono">{stats.iqr.toFixed(3)}</span>
                    </div>
                  </div>
                </div>

                {/* Position */}
                <div>
                  <h4 className="font-semibold mb-3 text-purple-700">Position</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Minimum :</span>
                      <span className="font-mono">{stats.min.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Q1 :</span>
                      <span className="font-mono">{stats.q1.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Q3 :</span>
                      <span className="font-mono">{stats.q3.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maximum :</span>
                      <span className="font-mono">{stats.max.toFixed(3)}</span>
                    </div>
                  </div>
                </div>

                {/* Forme */}
                <div className="md:col-span-2 lg:col-span-1">
                  <h4 className="font-semibold mb-3 text-orange-700">Forme</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Asymétrie :</span>
                      <span className="font-mono">{stats.skewness.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aplatissement :</span>
                      <span className="font-mono">{stats.kurtosis.toFixed(3)}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    {Math.abs(stats.skewness) < 0.5 ? "Distribution symétrique" : 
                     stats.skewness > 0.5 ? "Asymétrie positive" : "Asymétrie négative"}
                  </div>
                </div>

                {/* Résumé */}
                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3 text-gray-700">Résumé des 5 nombres</h4>
                  <div className="flex justify-between text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <span>{stats.min.toFixed(1)}</span>
                    <span>{stats.q1.toFixed(1)}</span>
                    <span className="font-semibold">{stats.median.toFixed(1)}</span>
                    <span>{stats.q3.toFixed(1)}</span>
                    <span>{stats.max.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Min</span>
                    <span>Q1</span>
                    <span>Médiane</span>
                    <span>Q3</span>
                    <span>Max</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

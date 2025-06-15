
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatsData } from "@/pages/StatsPro";

interface StatisticalTestsProps {
  datasets: StatsData[];
}

// Tests statistiques simplifiés
const performTTest = (values: number[], mu0: number = 0) => {
  const n = values.length;
  const mean = values.reduce((sum, val) => sum + val, 0) / n;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  const stdError = Math.sqrt(variance / n);
  const tStat = (mean - mu0) / stdError;
  const df = n - 1;
  
  // Approximation p-value (simplifiée)
  const pValue = tStat > 0 ? 2 * (1 - normalCDF(Math.abs(tStat))) : 2 * normalCDF(tStat);
  
  return {
    statistic: tStat,
    pValue: Math.max(0.001, Math.min(0.999, pValue)), // Borner entre 0.001 et 0.999
    df,
    mean,
    stdError,
    significant: pValue < 0.05
  };
};

const performCorrelation = (x: number[], y: number[]) => {
  if (x.length !== y.length) return null;
  
  const n = x.length;
  const meanX = x.reduce((sum, val) => sum + val, 0) / n;
  const meanY = y.reduce((sum, val) => sum + val, 0) / n;
  
  const numerator = x.reduce((sum, val, i) => sum + (val - meanX) * (y[i] - meanY), 0);
  const denomX = Math.sqrt(x.reduce((sum, val) => sum + Math.pow(val - meanX, 2), 0));
  const denomY = Math.sqrt(y.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0));
  
  const correlation = numerator / (denomX * denomY);
  
  // Test de significativité
  const tStat = correlation * Math.sqrt((n - 2) / (1 - correlation * correlation));
  const pValue = 2 * (1 - normalCDF(Math.abs(tStat)));
  
  return {
    correlation,
    pValue: Math.max(0.001, Math.min(0.999, pValue)),
    n,
    significant: pValue < 0.05
  };
};

// Approximation de la fonction de répartition normale
const normalCDF = (x: number) => {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
};

const erf = (x: number) => {
  // Approximation de la fonction d'erreur
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
};

export default function StatisticalTests({ datasets }: StatisticalTestsProps) {
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [selectedDataset1, setSelectedDataset1] = useState<string>("");
  const [selectedDataset2, setSelectedDataset2] = useState<string>("");
  const [mu0, setMu0] = useState<string>("0");
  const [testResult, setTestResult] = useState<any>(null);

  const runTTest = () => {
    const dataset = datasets.find(d => d.name === selectedDataset1);
    if (!dataset) return;
    
    const result = performTTest(dataset.values, parseFloat(mu0));
    setTestResult({
      type: 'ttest',
      dataset: dataset.name,
      mu0: parseFloat(mu0),
      ...result
    });
  };

  const runCorrelation = () => {
    const dataset1 = datasets.find(d => d.name === selectedDataset1);
    const dataset2 = datasets.find(d => d.name === selectedDataset2);
    if (!dataset1 || !dataset2) return;
    
    const result = performCorrelation(dataset1.values, dataset2.values);
    if (result) {
      setTestResult({
        type: 'correlation',
        dataset1: dataset1.name,
        dataset2: dataset2.name,
        ...result
      });
    }
  };

  const resetTest = () => {
    setTestResult(null);
    setSelectedTest("");
    setSelectedDataset1("");
    setSelectedDataset2("");
    setMu0("0");
  };

  if (datasets.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Aucune donnée disponible pour les tests</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuration du test statistique</CardTitle>
          <CardDescription>
            Sélectionnez le type de test et les variables à analyser
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Type de test</Label>
            <Select value={selectedTest} onValueChange={setSelectedTest}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un test" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ttest">Test t de Student (1 échantillon)</SelectItem>
                <SelectItem value="correlation">Corrélation de Pearson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedTest === "ttest" && (
            <>
              <div>
                <Label>Variable à tester</Label>
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
              <div>
                <Label>Valeur de référence (μ₀)</Label>
                <Input
                  type="number"
                  value={mu0}
                  onChange={(e) => setMu0(e.target.value)}
                  placeholder="0"
                />
              </div>
              <Button onClick={runTTest} disabled={!selectedDataset1}>
                Exécuter le test t
              </Button>
            </>
          )}

          {selectedTest === "correlation" && (
            <>
              <div>
                <Label>Première variable (X)</Label>
                <Select value={selectedDataset1} onValueChange={setSelectedDataset1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir variable X" />
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
              <div>
                <Label>Seconde variable (Y)</Label>
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
              <Button onClick={runCorrelation} disabled={!selectedDataset1 || !selectedDataset2}>
                Calculer la corrélation
              </Button>
            </>
          )}

          {testResult && (
            <Button onClick={resetTest} variant="outline">
              Nouveau test
            </Button>
          )}
        </CardContent>
      </Card>

      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Résultats du test
              {testResult.significant && (
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                  Significatif (p &lt; 0.05)
                </span>
              )}
              {!testResult.significant && (
                <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  Non significatif
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {testResult.type === 'ttest' && (
              <div className="space-y-3">
                <h4 className="font-semibold">Test t de Student (1 échantillon)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Variable :</span> {testResult.dataset}
                  </div>
                  <div>
                    <span className="font-medium">H₀ : μ =</span> {testResult.mu0}
                  </div>
                  <div>
                    <span className="font-medium">Moyenne observée :</span> {testResult.mean.toFixed(3)}
                  </div>
                  <div>
                    <span className="font-medium">Erreur standard :</span> {testResult.stdError.toFixed(3)}
                  </div>
                  <div>
                    <span className="font-medium">Statistique t :</span> {testResult.statistic.toFixed(3)}
                  </div>
                  <div>
                    <span className="font-medium">Degrés de liberté :</span> {testResult.df}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Valeur p :</span> {testResult.pValue.toFixed(3)}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded">
                  <p className="text-sm">
                    <strong>Interprétation :</strong> {testResult.significant 
                      ? `Il y a une différence significative entre la moyenne observée (${testResult.mean.toFixed(3)}) et la valeur de référence (${testResult.mu0}).`
                      : `Il n'y a pas de différence significative entre la moyenne observée et la valeur de référence.`
                    }
                  </p>
                </div>
              </div>
            )}

            {testResult.type === 'correlation' && (
              <div className="space-y-3">
                <h4 className="font-semibold">Corrélation de Pearson</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Variables :</span> {testResult.dataset1} × {testResult.dataset2}
                  </div>
                  <div>
                    <span className="font-medium">Taille échantillon :</span> {testResult.n}
                  </div>
                  <div>
                    <span className="font-medium">Coefficient r :</span> {testResult.correlation.toFixed(3)}
                  </div>
                  <div>
                    <span className="font-medium">Valeur p :</span> {testResult.pValue.toFixed(3)}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded">
                  <p className="text-sm">
                    <strong>Interprétation :</strong> {
                      Math.abs(testResult.correlation) < 0.3 ? "Corrélation faible" :
                      Math.abs(testResult.correlation) < 0.7 ? "Corrélation modérée" : "Corrélation forte"
                    } {testResult.correlation > 0 ? "positive" : "négative"} 
                    {testResult.significant ? " et statistiquement significative." : " mais non significative."}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}


import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, Heart, Brain, Activity, TrendingUp, Play, Pause, Info, Wind, Scan } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

interface StressReading {
  id: string;
  timestamp: string;
  stressLevel: number;
  heartRate: number;
  hrv: number;
  breathingRate: number;
  recommendations: string[];
}

const STRESS_LEVELS = {
  LOW: { min: 0, max: 30, color: "bg-green-500", label: "Faible", description: "État de calme optimal" },
  MODERATE: { min: 31, max: 60, color: "bg-yellow-500", label: "Modéré", description: "Stress normal, gérable" },
  HIGH: { min: 61, max: 80, color: "bg-orange-500", label: "Élevé", description: "Attention nécessaire" },
  CRITICAL: { min: 81, max: 100, color: "bg-red-500", label: "Critique", description: "Intervention immédiate recommandée" }
};

const getStressLevel = (score: number) => {
  for (const [key, level] of Object.entries(STRESS_LEVELS)) {
    if (score >= level.min && score <= level.max) {
      return { key, ...level };
    }
  }
  return { key: "MODERATE", ...STRESS_LEVELS.MODERATE };
};

const STRESS_RECOMMENDATIONS = {
  LOW: [
    "Maintenez cette sérénité avec une routine équilibrée",
    "Profitez de ce moment pour une activité créative",
    "Considérez une courte méditation de gratitude"
  ],
  MODERATE: [
    "Prenez 5 minutes pour la respiration profonde",
    "Faites une courte pause et hydratez-vous",
    "Pratiquez quelques étirements doux"
  ],
  HIGH: [
    "Technique 4-7-8 : inspirez 4s, retenez 7s, expirez 8s",
    "Sortez prendre l'air frais quelques minutes",
    "Contactez un proche pour du soutien social"
  ],
  CRITICAL: [
    "Arrêtez toute activité stressante immédiatement",
    "Pratiquez la respiration guidée pendant 10 minutes",
    "Consultez un professionnel si cela persiste"
  ]
};

export default function StressScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [currentReading, setCurrentReading] = useState<StressReading | null>(null);
  const [readings, setReadings] = useState<StressReading[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanDuration, setScanDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('stress-readings');
    if (stored) {
      setReadings(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (readings.length > 0) {
      localStorage.setItem('stress-readings', JSON.stringify(readings));
    }
  }, [readings]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      setCameraError("Impossible d'accéder à la caméra. Vérifiez les permissions.");
      console.error("Camera access error:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const simulateStressAnalysis = () => {
    // Simulation d'analyse en temps réel
    // En production, ici on utiliserait MediaPipe, OpenCV.js ou similar
    const heartRate = 60 + Math.random() * 40; // 60-100 BPM
    const hrv = 20 + Math.random() * 60; // HRV score
    const breathingRate = 12 + Math.random() * 8; // 12-20 breaths/min
    
    // Algorithme simplifié de calcul du stress
    const stressScore = Math.min(100, Math.max(0, 
      (100 - hrv) * 0.4 + 
      (Math.abs(heartRate - 70) / 70 * 100) * 0.3 + 
      (Math.abs(breathingRate - 16) / 16 * 100) * 0.3
    ));

    const stressLevel = getStressLevel(stressScore);
    const recommendations = STRESS_RECOMMENDATIONS[stressLevel.key as keyof typeof STRESS_RECOMMENDATIONS];

    const reading: StressReading = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      stressLevel: Math.round(stressScore),
      heartRate: Math.round(heartRate),
      hrv: Math.round(hrv),
      breathingRate: Math.round(breathingRate * 10) / 10,
      recommendations: recommendations.slice(0, 2)
    };

    setCurrentReading(reading);
  };

  const startScanning = async () => {
    await startCamera();
    setIsScanning(true);
    setScanDuration(0);
    
    // Simulation du scan en temps réel
    intervalRef.current = setInterval(simulateStressAnalysis, 2000);
    
    // Timer pour la durée du scan
    scanIntervalRef.current = setInterval(() => {
      setScanDuration(prev => prev + 1);
    }, 1000);
  };

  const stopScanning = () => {
    setIsScanning(false);
    stopCamera();
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    // Sauvegarder la lecture finale
    if (currentReading) {
      setReadings(prev => [currentReading, ...prev.slice(0, 9)]); // Garder les 10 dernières
    }
    
    setScanDuration(0);
  };

  const recentReadings = readings.slice(0, 5);
  const avgStressLevel = readings.length > 0 
    ? Math.round(readings.reduce((sum, r) => sum + r.stressLevel, 0) / readings.length)
    : 0;

  return (
    <main className="min-h-screen animate-fade-in bg-gradient-to-br from-violet-400 via-fuchsia-300 to-pink-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Breadcrumbs et retour home */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <span className="cursor-pointer text-blue-700 hover:underline" onClick={() => navigate("/")}>
                      Accueil
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbPage>StressScanner</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-fuchsia-100 text-violet-700 font-semibold shadow transition group"
          >
            <Scan className="w-5 h-5 text-fuchsia-500 group-hover:scale-110 transition" />
            Retour accueil
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Brain className="h-12 w-12 text-fuchsia-600 drop-shadow-lg" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">StressScanner</h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Analyse physiologique du stress via caméra 📷
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="secondary">{readings.length} analyses</Badge>
            <Badge variant="secondary">Stress moyen: {avgStressLevel}/100</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Camera Scanner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                Scanner Physiologique
              </CardTitle>
              <CardDescription>
                Positionnez votre visage dans le cadre pour l'analyse temps réel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Video Feed */}
              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                  style={{ display: isScanning ? 'block' : 'none' }}
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-64"
                  style={{ display: 'none' }}
                />
                {!isScanning && (
                  <div className="w-full h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Cliquez sur "Démarrer" pour commencer l'analyse</p>
                    </div>
                  </div>
                )}
                
                {/* Scanning Overlay */}
                {isScanning && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Analyse en cours... {scanDuration}s
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                {!isScanning ? (
                  <Button onClick={startScanning} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Démarrer l'analyse
                  </Button>
                ) : (
                  <Button onClick={stopScanning} variant="destructive" className="flex-1">
                    <Pause className="h-4 w-4 mr-2" />
                    Arrêter
                  </Button>
                )}
              </div>

              {cameraError && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>{cameraError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Real-time Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Résultats Temps Réel
              </CardTitle>
              <CardDescription>
                Métriques physiologiques et recommandations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {currentReading ? (
                <>
                  {/* Stress Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Niveau de Stress</span>
                      <span className="text-lg font-bold">{currentReading.stressLevel}/100</span>
                    </div>
                    <Progress value={currentReading.stressLevel} className="h-3" />
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStressLevel(currentReading.stressLevel).color}`}></div>
                      <span className="text-sm text-gray-600">
                        {getStressLevel(currentReading.stressLevel).label} - {getStressLevel(currentReading.stressLevel).description}
                      </span>
                    </div>
                  </div>

                  {/* Vital Signs */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <Heart className="h-6 w-6 text-red-500 mx-auto mb-1" />
                      <div className="text-lg font-semibold">{currentReading.heartRate}</div>
                      <div className="text-xs text-gray-500">BPM</div>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                      <div className="text-lg font-semibold">{currentReading.hrv}</div>
                      <div className="text-xs text-gray-500">HRV</div>
                    </div>
                    <div className="text-center">
                      <Wind className="h-6 w-6 text-green-500 mx-auto mb-1" />
                      <div className="text-lg font-semibold">{currentReading.breathingRate}</div>
                      <div className="text-xs text-gray-500">resp/min</div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Recommandations Immédiates</h4>
                    <ul className="space-y-1">
                      {currentReading.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Démarrez une analyse pour voir les résultats en temps réel</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Historical Data */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Historique des Analyses</CardTitle>
            <CardDescription>
              Vos dernières mesures de stress et tendances
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentReadings.length > 0 ? (
              <div className="space-y-3">
                {recentReadings.map((reading) => {
                  const stressLevel = getStressLevel(reading.stressLevel);
                  return (
                    <div key={reading.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${stressLevel.color}`}></div>
                        <div>
                          <div className="font-medium">{reading.stressLevel}/100 - {stressLevel.label}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(reading.timestamp).toLocaleString('fr-FR')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>❤️ {reading.heartRate} BPM</div>
                        <div>🫁 {reading.breathingRate} resp/min</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Aucune analyse enregistrée. Commencez votre première mesure !
              </p>
            )}
          </CardContent>
        </Card>

        {/* Features Coming Soon */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Fonctionnalités à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <ul className="space-y-1">
                <li>• Analyse micro-expressions avec MediaPipe</li>
                <li>• Machine learning patterns personnalisés</li>
                <li>• Intégration calendrier stress préventif</li>
                <li>• Biofeedback visuel cohérence cardiaque</li>
              </ul>
              <ul className="space-y-1">
                <li>• Export données médicales (PDF/CSV)</li>
                <li>• Détection triggers via IA contextuelle</li>
                <li>• Corrélations environnementales</li>
                <li>• Coaching personnalisé adaptatif</li>
              </ul>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}

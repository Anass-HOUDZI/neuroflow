
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Waves, Play, Pause, Square, Volume2, Download, Save } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SoundLayer {
  id: string;
  name: string;
  category: string;
  volume: number;
  isPlaying: boolean;
  audioUrl?: string;
}

interface Composition {
  id: string;
  name: string;
  layers: SoundLayer[];
  createdAt: string;
}

const soundCategories = {
  nature: {
    name: 'Nature',
    sounds: [
      { id: 'rain', name: 'Pluie douce', description: 'Pluie régulière et apaisante' },
      { id: 'ocean', name: 'Vagues océan', description: 'Ressac maritime relaxant' },
      { id: 'forest', name: 'Forêt', description: 'Oiseaux et bruissement des feuilles' },
      { id: 'stream', name: 'Ruisseau', description: 'Eau qui coule doucement' },
      { id: 'wind', name: 'Vent', description: 'Brise légère dans les arbres' },
      { id: 'thunder', name: 'Orage lointain', description: 'Tonnerre distant et pluie' }
    ]
  },
  ambient: {
    name: 'Ambiant',
    sounds: [
      { id: 'pad_warm', name: 'Nappe chaude', description: 'Harmonies douces et enveloppantes' },
      { id: 'drone_deep', name: 'Drone profond', description: 'Fréquences basses continues' },
      { id: 'bells', name: 'Cloches tibétaines', description: 'Tintements harmoniques' },
      { id: 'choir', name: 'Chœur éthéré', description: 'Voix humaines sublimées' },
      { id: 'strings', name: 'Cordes atmosphériques', description: 'Instruments à cordes planants' }
    ]
  },
  binaural: {
    name: 'Binaural',
    sounds: [
      { id: 'alpha', name: 'Ondes Alpha (8-13 Hz)', description: 'Relaxation et créativité' },
      { id: 'theta', name: 'Ondes Thêta (4-8 Hz)', description: 'Méditation profonde' },
      { id: 'beta', name: 'Ondes Bêta (13-30 Hz)', description: 'Concentration et focus' },
      { id: 'gamma', name: 'Ondes Gamma (30-100 Hz)', description: 'Attention accrue' },
      { id: 'delta', name: 'Ondes Delta (0.5-4 Hz)', description: 'Sommeil profond' }
    ]
  }
};

export default function SoundWeaver() {
  const [activeLayers, setActiveLayers] = useState<SoundLayer[]>([]);
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [currentComposition, setCurrentComposition] = useState<string>('');
  const [masterVolume, setMasterVolume] = useState([50]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedCompositions = localStorage.getItem('soundweaver-compositions');
    if (savedCompositions) {
      setCompositions(JSON.parse(savedCompositions));
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const addLayer = (categoryKey: string, sound: any) => {
    const newLayer: SoundLayer = {
      id: `${categoryKey}_${sound.id}_${Date.now()}`,
      name: sound.name,
      category: soundCategories[categoryKey as keyof typeof soundCategories].name,
      volume: 50,
      isPlaying: false
    };

    setActiveLayers(prev => [...prev, newLayer]);
  };

  const removeLayer = (layerId: string) => {
    setActiveLayers(prev => prev.filter(layer => layer.id !== layerId));
  };

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, isPlaying: !layer.isPlaying }
        : layer
    ));
  };

  const updateLayerVolume = (layerId: string, volume: number) => {
    setActiveLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, volume }
        : layer
    ));
  };

  const saveComposition = () => {
    if (activeLayers.length === 0) return;
    
    const name = currentComposition || `Composition ${compositions.length + 1}`;
    const composition: Composition = {
      id: Date.now().toString(),
      name,
      layers: [...activeLayers],
      createdAt: new Date().toISOString()
    };

    const updatedCompositions = [...compositions, composition];
    setCompositions(updatedCompositions);
    localStorage.setItem('soundweaver-compositions', JSON.stringify(updatedCompositions));
    setCurrentComposition('');
  };

  const loadComposition = (composition: Composition) => {
    setActiveLayers([...composition.layers]);
    setCurrentComposition(composition.name);
  };

  const deleteComposition = (compositionId: string) => {
    const updatedCompositions = compositions.filter(comp => comp.id !== compositionId);
    setCompositions(updatedCompositions);
    localStorage.setItem('soundweaver-compositions', JSON.stringify(updatedCompositions));
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Simulation d'enregistrement
    console.log('🎵 Début d\'enregistrement de la composition');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    console.log('🎵 Fin d\'enregistrement de la composition');
  };

  const exportComposition = () => {
    // Simulation d'export
    console.log('📥 Export de la composition en cours...');
    alert('Composition exportée ! (simulation)');
  };

  const playingLayers = activeLayers.filter(layer => layer.isPlaying);
  const totalLayers = activeLayers.length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="SoundWeaver"
          description="Composez des paysages sonores personnalisés pour la relaxation et la concentration"
          icon={<Waves className="h-12 w-12 text-violet-500" />}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                {playingLayers.length}/{totalLayers} actifs
              </Button>
              <Button onClick={saveComposition} disabled={activeLayers.length === 0} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          }
        />

        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Contrôles principaux */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Mixeur */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎛️ Mixeur
                  {isRecording && (
                    <Badge variant="destructive" className="animate-pulse">
                      REC {formatTime(recordingTime)}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Contrôlez vos couches sonores actives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Volume maître */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Volume maître</span>
                    <span className="text-sm">{masterVolume[0]}%</span>
                  </div>
                  <Slider
                    value={masterVolume}
                    onValueChange={setMasterVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Couches actives */}
                <div className="space-y-3">
                  {activeLayers.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Waves className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Ajoutez des sons pour commencer votre composition</p>
                    </div>
                  ) : (
                    activeLayers.map(layer => (
                      <div key={layer.id} className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={layer.isPlaying ? "default" : "outline"}
                              onClick={() => toggleLayer(layer.id)}
                            >
                              {layer.isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                            </Button>
                            <div>
                              <div className="font-medium text-sm">{layer.name}</div>
                              <div className="text-xs text-muted-foreground">{layer.category}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeLayer(layer.id)}
                          >
                            <Square className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          <Slider
                            value={[layer.volume]}
                            onValueChange={(value) => updateLayerVolume(layer.id, value[0])}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-xs w-8">{layer.volume}%</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Contrôles d'enregistrement */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "destructive" : "default"}
                    disabled={playingLayers.length === 0}
                  >
                    {isRecording ? 'Arrêter' : 'Enregistrer'}
                  </Button>
                  <Button onClick={exportComposition} variant="outline" disabled={activeLayers.length === 0}>
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Compositions sauvegardées */}
            <Card>
              <CardHeader>
                <CardTitle>💾 Compositions sauvegardées</CardTitle>
                <CardDescription>Vos créations sonores</CardDescription>
              </CardHeader>
              <CardContent>
                {compositions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Save className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune composition sauvegardée</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {compositions.map(composition => (
                      <div key={composition.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{composition.name}</div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteComposition(composition.id)}
                          >
                            ✕
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {composition.layers.length} couches • {new Date(composition.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => loadComposition(composition)}
                          className="w-full"
                        >
                          Charger
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bibliothèque de sons */}
          <div className="space-y-6">
            {Object.entries(soundCategories).map(([categoryKey, category]) => (
              <Card key={categoryKey}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>
                    {categoryKey === 'nature' && 'Sons naturels pour une immersion authentique'}
                    {categoryKey === 'ambient' && 'Textures sonores pour l\'ambiance'}
                    {categoryKey === 'binaural' && 'Fréquences pour l\'optimisation cérébrale'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.sounds.map(sound => (
                      <div key={sound.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm">{sound.name}</div>
                          <Button
                            size="sm"
                            onClick={() => addLayer(categoryKey, sound)}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {sound.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Guide d'utilisation */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Guide SoundWeaver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-1">🎼 Composition</div>
                  <div className="text-muted-foreground">Combinez différents sons pour créer votre paysage sonore idéal</div>
                </div>
                <div>
                  <div className="font-medium mb-1">🔊 Mixage</div>
                  <div className="text-muted-foreground">Ajustez le volume de chaque couche pour un équilibre parfait</div>
                </div>
                <div>
                  <div className="font-medium mb-1">💾 Sauvegarde</div>
                  <div className="text-muted-foreground">Enregistrez vos compositions favorites pour les réutiliser</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}

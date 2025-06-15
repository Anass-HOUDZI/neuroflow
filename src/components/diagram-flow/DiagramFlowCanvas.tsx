
import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const initialNodes = [
  {
    id: '1',
    type: 'input',
    position: { x: 50, y: 40 },
    data: { label: "Idée Source" },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 300, y: 120 },
    data: { label: "Concept relié" },
  },
  {
    id: '3',
    type: 'output',
    position: { x: 600, y: 100 },
    data: { label: "Action finale" },
  },
  {
    id: 'ann1',
    type: 'annotation',
    position: { x: 70, y: 250 },
    draggable: false,
    selectable: false,
    data: { level: 1, label: "Double-clic : ajout texte ; glisser-déposer pour relier" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "lien 1",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "lien 2",
  },
];

function AnnotationNode({ data }: any) {
  return (
    <div className="px-2 py-1 bg-yellow-50 rounded border border-yellow-200 text-yellow-900 text-xs shadow">
      <span className="font-semibold mr-1 text-yellow-700">{data.level}.</span>
      {data.label}
    </div>
  );
}

const nodeTypes = { annotation: AnnotationNode };

// REMOVED nodeClassName because it's not an accepted prop anymore

export default function DiagramFlowCanvas() {
  const reactFlowRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Export as PNG
  const handleExportPng = async () => {
    // Query returns Element | null; must be HTMLElement for html2canvas
    const flow = document.querySelector('.react-flow') as HTMLElement | null;
    if (!flow) return;
    // Utilisation toBlob (nav support), fallback toCanvas
    const html2canvas = (await import('html2canvas')).default;
    const blob = await html2canvas(flow, {
      backgroundColor: "#FDFFF7",
      useCORS: true,
    }).then((canvas) =>
      new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"))
    );
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagramflow-export.png";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-[60vh] md:h-[80vh] rounded-xl bg-white/90 dark:bg-gray-900/60 shadow-md ring-1 ring-gray-200 dark:ring-gray-800 relative overflow-hidden">
      <div className="absolute z-30 right-3 top-3 flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleExportPng}>
          <Download className="w-4 h-4 mr-1" /> Export PNG
        </Button>
      </div>
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={0.5}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
        // nodeClassName REMOVED!
      >
        <MiniMap /* nodeClassName REMOVED! */ />
        <Controls />
        <Background gap={16} size={0.5} color="#c3e6f5" className="opacity-80" />
      </ReactFlow>
    </div>
  );
}


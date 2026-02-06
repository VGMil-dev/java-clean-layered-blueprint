import React, { useEffect, useState } from 'react';
import {
    ReactFlow,
    Background,
    Handle,
    Position,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
    ReactFlowProvider,
    useReactFlow,
    BaseEdge,
    getSmoothStepPath,
} from '@xyflow/react';
import type { Node, Edge, NodeProps, EdgeProps } from '@xyflow/react';
import { Box, Layers, Monitor, Layout, Component, Terminal } from 'lucide-react';
import '@xyflow/react/dist/style.css';

const IconMap = {
    object: Box,
    component: Component,
    container: Layout,
    jcomponent: Layers,
    window: Monitor,
    jpanel: Layout,
    frame: Monitor,
    jframe: Terminal,
};

const CinematicEdge = (props: EdgeProps) => {
    const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, markerEnd } = props;
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 20,
    });

    return (
        <BaseEdge
            path={edgePath}
            markerEnd={markerEnd}
            style={{
                ...style,
                transition: 'stroke 1s, stroke-width 1s, opacity 1s',
            }}
        />
    );
};

const edgeTypes = {
    cinematic: CinematicEdge,
};

const SwingNode = ({ data }: NodeProps) => {
    const isActive = data.isActive;
    const Icon = IconMap[data.icon as keyof typeof IconMap] || Box;

    let borderColor = "border-[var(--swing-border-white-medium)]";
    let bgGradient = "bg-[var(--swing-bg-node)]";
    let textColor = "text-[var(--swing-text-inactive)]";
    let iconColor = "text-[var(--swing-icon-inactive)]";
    let glow = "";

    if (isActive) {
        borderColor = "border-[var(--sl-color-accent)]";
        bgGradient = "bg-[var(--swing-bg-node-active)]";
        textColor = "text-white";
        iconColor = "text-[var(--sl-color-accent)]";
        glow = "shadow-[0_0_40px_rgba(var(--sl-color-accent-rgb),0.4)]";
    }

    const layerColors = {
        cyan: "text-cyan-300",
        yellow: "text-amber-200",
        pink: "text-rose-300",
        orange: "text-orange-300",
    };

    const activeText = (isActive && typeof data.color === 'string')
        ? layerColors[data.color as keyof typeof layerColors] || "text-[var(--sl-color-accent)]"
        : textColor;

    return (
        <div className={`px-6 py-4 rounded-[24px] border-2 transition-all duration-[1000ms] min-w-[220px] font-mono ${bgGradient} ${borderColor} ${glow} ${isActive ? 'scale-110 opacity-100 ring-2 ring-[var(--sl-color-accent)]/20' : 'scale-95 opacity-70'}`}>
            <Handle type="target" position={Position.Top} className="!opacity-0" />
            <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl bg-[var(--swing-bg-white-low)] ${iconColor} transition-all duration-700 ${isActive ? 'scale-110' : ''}`}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold leading-none mb-1.5">{typeof data.subtitle === 'string' ? data.subtitle : ''}</span>
                    <span className={`${activeText} text-[16px] font-bold tracking-tight transition-colors duration-700`}>{typeof data.label === 'string' ? data.label : ''}</span>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="!opacity-0" />
        </div>
    );
};

const nodeTypes = {
    swing: SwingNode,
};

const initialNodes: Node[] = [
    { id: 'object', type: 'swing', data: { label: 'Object', subtitle: 'java.lang', color: 'cyan', icon: 'object', isActive: false }, position: { x: 300, y: 0 } },
    { id: 'component', type: 'swing', data: { label: 'Component', subtitle: 'java.awt', color: 'yellow', icon: 'component', isActive: false }, position: { x: 300, y: 130 } },
    { id: 'container', type: 'swing', data: { label: 'Container', subtitle: 'java.awt', color: 'yellow', icon: 'container', isActive: false }, position: { x: 300, y: 260 } },
    { id: 'jcomponent', type: 'swing', data: { label: 'JComponent', subtitle: 'javax.swing', color: 'pink', icon: 'jcomponent', isActive: false }, position: { x: 100, y: 400 } },
    { id: 'window', type: 'swing', data: { label: 'Window', subtitle: 'java.awt', color: 'yellow', icon: 'window', isActive: false }, position: { x: 500, y: 400 } },
    { id: 'jpanel', type: 'swing', data: { label: 'JPanel', subtitle: 'javax.swing', color: 'pink', icon: 'jpanel', isActive: false }, position: { x: 100, y: 560 } },
    { id: 'frame', type: 'swing', data: { label: 'Frame', subtitle: 'java.awt', color: 'yellow', icon: 'frame', isActive: false }, position: { x: 500, y: 560 } },
    { id: 'jframe', type: 'swing', data: { label: 'JFrame', subtitle: 'javax.swing', color: 'orange', icon: 'jframe', isActive: false }, position: { x: 500, y: 720 } }
];

const initialEdges: Edge[] = [
    { id: 'e1', source: 'object', target: 'component', type: 'cinematic', style: { stroke: 'var(--swing-edge-inactive)', strokeWidth: 2 } },
    { id: 'e2', source: 'component', target: 'container', type: 'cinematic', style: { stroke: 'var(--swing-edge-inactive)', strokeWidth: 2 } },
    { id: 'e3', source: 'container', target: 'jcomponent', type: 'cinematic', style: { stroke: 'var(--swing-edge-inactive)', strokeWidth: 2 } },
    { id: 'e4', source: 'container', target: 'window', type: 'cinematic', style: { stroke: 'var(--swing-edge-inactive)', strokeWidth: 2 } },
    { id: 'e5', source: 'jcomponent', target: 'jpanel', type: 'cinematic', style: { stroke: 'var(--swing-edge-inactive)', strokeWidth: 2 } },
    { id: 'e6', source: 'window', target: 'frame', type: 'cinematic', style: { stroke: 'var(--swing-edge-inactive)', strokeWidth: 2 } },
    { id: 'e7', source: 'frame', target: 'jframe', type: 'cinematic', style: { stroke: 'var(--swing-edge-inactive)', strokeWidth: 2 } },
];

const animationSteps = [
    { nodes: ['object'], title: "1. La Raíz de Todo", desc: "java.lang.Object: El ancestro universal de todas las clases en Java del cual todos heredan." },
    { nodes: ['component'], title: "2. Capacidades Visuales", desc: "java.awt.Component: Define cómo se pinta un elemento, su tamaño y cómo recibe eventos." },
    { nodes: ['container'], title: "3. La Caja de Herramientas", desc: "java.awt.Container: Añade la capacidad de contener y organizar otros componentes hijos." },
    // Rama de Componentes Ligeros (Swing)
    { nodes: ['jcomponent'], title: "4. Swing (Lightweight)", desc: "javax.swing.JComponent: La base de Swing. Dibuja sus propios píxeles sin depender del SO." },
    { nodes: ['jpanel'], title: "5. JPanel (El Lienzo)", desc: "javax.swing.JPanel: Hereda de JComponent para proveer un espacio de dibujo y organización." },
    // Rama de Ventanas de Alto Nivel
    { nodes: ['window'], title: "6. Ventanas Base", desc: "java.awt.Window: Una superficie de pantalla libre, sin bordes ni barras de título." },
    { nodes: ['frame'], title: "7. Frame (Marco Nativo)", desc: "java.awt.Frame: Añade decoraciones nativas como el título y los botones de cerrar/minimizar." },
    { nodes: ['jframe'], title: "8. JFrame (La Ventana Swing)", desc: "javax.swing.JFrame: La versión Swing de Frame que añade soporte para capas y menús." }
];

const FlowContent = ({ currentStep }: { currentStep: number }) => {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    const { fitView } = useReactFlow();

    useEffect(() => {
        const step = animationSteps[currentStep];
        const activeNodeIds = step.nodes;

        setNodes((nds) =>
            nds.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    isActive: activeNodeIds.includes(node.id),
                },
            }))
        );

        setEdges((eds) =>
            eds.map((edge) => {
                const isActive = activeNodeIds.includes(edge.target);
                return {
                    ...edge,
                    animated: isActive,
                    style: {
                        ...edge.style,
                        stroke: isActive ? 'var(--sl-color-accent)' : 'var(--swing-edge-inactive)',
                        strokeWidth: isActive ? 4 : 2,
                        opacity: isActive ? 1 : 0.15,
                    },
                };
            })
        );

        setTimeout(() => {
            fitView({
                nodes: activeNodeIds.map(id => ({ id })),
                padding: 4,
                duration: 1500
            });
        }, 100);

    }, [currentStep, setNodes, setEdges, fitView]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            colorMode="dark"
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnDrag={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            panOnScroll={false}
            preventScrolling={false}
            selectionOnDrag={false}
            proOptions={{ hideAttribution: true }}
        >
            <Background variant={BackgroundVariant.Dots} gap={40} size={1} color="var(--swing-edge-inactive)" />
        </ReactFlow>
    );
};

export default function SwingHierarchy() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % animationSteps.length);
        }, 6000); // Un poco mas de tiempo para leer: 6s
        return () => clearInterval(interval);
    }, []);

    const step = animationSteps[currentStep];

    return (
        <div className="h-[600px] w-full bg-[var(--swing-bg-main)] rounded-[48px] border-4 border-[var(--swing-border-white-low)] overflow-hidden shadow-[var(--swing-shadow-main)] my-24 relative group select-none font-mono">
            {/* Overlay Gradient for Cinematic Feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--sl-color-accent)]/10 to-transparent pointer-events-none z-10" />

            <div className="absolute top-12 left-12 z-20 pointer-events-none max-w-[450px]">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[var(--swing-bg-white-medium)] border border-[var(--swing-border-white-high)] backdrop-blur-3xl w-fit">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--sl-color-accent)] animate-pulse shadow-[0_0_20px_var(--sl-color-accent)]" />
                        <span className="text-[13px] font-black text-white uppercase tracking-[0.5em]">Cinematic Flow</span>
                    </div>

                    <div className="flex flex-col gap-3 transition-all duration-1000">
                        <h3 className="text-3xl font-bold text-white tracking-widest drop-shadow-[var(--swing-shadow-text)] animate-in fade-in slide-in-from-left-6 duration-1000" key={`title-${currentStep}`}>
                            {step.title}
                        </h3>
                        <p className="text-base text-[var(--swing-text-medium)] leading-relaxed font-semibold drop-shadow-[var(--swing-shadow-desc)] animate-in fade-in slide-in-from-left-6 duration-1000 delay-150" key={`desc-${currentStep}`}>
                            {step.desc}
                        </p>
                    </div>
                </div>
            </div>

            <ReactFlowProvider>
                <FlowContent currentStep={currentStep} />
            </ReactFlowProvider>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4 pointer-events-none">
                {animationSteps.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-1000 ${idx === currentStep ? 'bg-[var(--sl-color-accent)] w-16 shadow-[0_0_20px_var(--sl-color-accent)]' : 'bg-[var(--swing-bg-white-low)] w-3'}`}
                    />
                ))}
            </div>
        </div>
    );
}

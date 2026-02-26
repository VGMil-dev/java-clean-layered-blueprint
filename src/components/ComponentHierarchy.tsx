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
    getSmoothStepPath,
    BaseEdge,
} from '@xyflow/react';
import type { Node, Edge, NodeProps, EdgeProps } from '@xyflow/react';
import { Box, Layers, Component, Type, Square, MousePointer2, Layout, Monitor, User, Zap, GitBranch, Database } from 'lucide-react';
import '@xyflow/react/dist/style.css';

const IconMap = {
    object: Box,
    component: Component,
    container: Layout,
    window: Monitor,
    jframe: Monitor,
    jcomponent: Layers,
    jlabel: Type,
    jbutton: MousePointer2,
    jpanel: Square,
    jtextfield: Type,
    user: User,
    view: Monitor,
    event: Zap,
    orchestrator: GitBranch,
    model: Database,
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
                filter: props.animated ? 'drop-shadow(0 0 12px rgba(var(--sl-color-accent-rgb), 0.8))' : 'none',
            }}
        />
    );
};

const edgeTypes = {
    cinematic: CinematicEdge,
};

const HierarchyNode = ({ data }: NodeProps) => {
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
        textColor = "text-[var(--sl-color-white)]";
        iconColor = "text-[var(--sl-color-accent)]";
        glow = "shadow-[0_0_40px_rgba(var(--sl-color-accent-rgb),0.4)]";
    }

    return (
        <div className={`px-4 md:px-6 py-3 md:py-4 rounded-[20px] md:rounded-[24px] border-2 transition-all duration-[1000ms] min-w-[170px] md:min-w-[200px] font-mono ${bgGradient} ${borderColor} ${glow} ${isActive ? 'scale-110 opacity-100 ring-2 ring-[var(--sl-color-accent)]/20' : 'scale-95 opacity-70'}`}>
            <Handle type="target" position={Position.Top} className="!opacity-0" />
            <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl bg-[var(--swing-bg-white-low)] ${iconColor} transition-all duration-700 ${isActive ? 'scale-110' : ''}`}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold leading-none mb-1.5 text-[var(--swing-text-inactive)]">{typeof data.subtitle === 'string' ? data.subtitle : ''}</span>
                    <span className={`text-[15px] font-bold tracking-tight transition-colors duration-700 ${isActive ? 'text-[var(--sl-color-white)]' : textColor}`}>{typeof data.label === 'string' ? data.label : ''}</span>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="!opacity-0" />
        </div>
    );
};

const nodeTypes = {
    hierarchy: HierarchyNode,
};

import type { HierarchyConfig } from './hierarchies/hierarchyConfigs';

interface HierarchyProps {
    config: HierarchyConfig;
    description: string;
    controlledStep?: number;
    isManual?: boolean;
}

const FlowContent = ({ config, currentStep }: { config: HierarchyConfig, currentStep: number }) => {
    const [nodes, setNodes] = useNodesState(config.nodes);
    const [edges, setEdges] = useEdgesState(config.edges);
    const { fitView } = useReactFlow();

    useEffect(() => {
        const step = config.steps[currentStep];
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
                        stroke: isActive ? 'var(--sl-color-accent)' : 'rgba(var(--sl-color-accent-rgb), 0.25)',
                        strokeWidth: isActive ? 10 : 4,
                        opacity: isActive ? 1 : 0.6,
                    },
                };
            })
        );

        setTimeout(() => {
            fitView({
                nodes: activeNodeIds.map(id => ({ id })),
                padding: 3,
                duration: 1200
            });
        }, 100);

    }, [currentStep, config, setNodes, setEdges, fitView]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnDrag={false}
            proOptions={{ hideAttribution: true }}
        >
            <Background variant={BackgroundVariant.Lines} gap={60} size={1} color="rgba(var(--sl-color-accent-rgb), 0.05)" />
        </ReactFlow>
    );
};

export default function ComponentHierarchy({ config, description, controlledStep, isManual }: HierarchyProps) {
    const [internalStep, setInternalStep] = useState(0);

    const currentStep = isManual && controlledStep !== undefined ? controlledStep : internalStep;

    useEffect(() => {
        if (isManual) return;

        const interval = setInterval(() => {
            setInternalStep((prev) => (prev + 1) % config.steps.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [config.steps.length, isManual]);

    const step = config.steps[currentStep];

    return (
        <div className="h-[350px] md:h-[450px] w-full bg-[var(--swing-bg-main)] rounded-[32px] border-2 border-[var(--swing-border-white-low)] overflow-hidden my-6 md:my-8 relative font-mono">
            <div className="absolute top-4 md:top-8 left-4 md:left-8 z-20 pointer-events-none max-w-[240px] md:max-w-[400px]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--swing-bg-white-medium)] border border-[var(--swing-border-white-high)] backdrop-blur-xl w-fit">
                        <div className="w-2 h-2 rounded-full bg-[var(--sl-color-accent)] animate-pulse" />
                        <span className="text-[10px] md:text-[11px] font-bold text-[var(--sl-color-white)] uppercase tracking-wider">{description}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg md:text-xl font-bold text-[var(--sl-color-white)] transition-all duration-700 leading-tight" key={`title-${currentStep}`}>
                            {step.title}
                        </h3>
                        <p className="text-[12px] md:text-sm text-[var(--swing-text-medium)] leading-relaxed" key={`desc-${currentStep}`}>
                            {step.desc}
                        </p>
                    </div>
                </div>
            </div>

            <ReactFlowProvider>
                <FlowContent config={config} currentStep={currentStep} />
            </ReactFlowProvider>

            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-none">
                {config.steps.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentStep ? 'bg-[var(--sl-color-accent)] w-8' : 'bg-[var(--swing-bg-white-low)] w-2'}`}
                    />
                ))}
            </div>
        </div>
    );
}

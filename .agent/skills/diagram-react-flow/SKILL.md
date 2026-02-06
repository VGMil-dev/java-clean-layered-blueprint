---
name: DiagramReactFlow
description: Standardized instructions for creating theme-aware, animated architecture diagrams using @xyflow/react. Focuses on "Illustration Mode" (static canvas) and flexible design system integration.
---

# DiagramReactFlow Skill

This skill defines the blueprint for building consistent, animated, and theme-aware architecture diagrams. It prioritizes a polished "illustration" look over a complex graph editor.

## Visual Philosophy (Illustration Mode)

Diagrams should behave like **interactive components**, not infinite canvas editors. The goal is to present a focused workflow or system architecture.

### ReactFlow Configuration
Disable complex interactions to keep the user focused on the content:
```tsx
<ReactFlow
    nodes={nodes}
    edges={edges}
    fitView
    nodesDraggable={false}
    nodesConnectable={false}
    elementsSelectable={false}
    zoomOnScroll={false}
    panOnDrag={false}
    zoomOnPinch={false}
    zoomOnDoubleClick={false}
    panOnScroll={false}
    preventScrolling={false}
    proOptions={{ hideAttribution: true }}
>
    {/* Use theme-aware variables for background grid */}
    <Background color="var(--color-bg-hairline)" gap={20} />
</ReactFlow>
```

## Theme Integration

Integrate with the project's design system using CSS variables. Ensure variables handle both light and dark modes.

### Standard Variable Mappings
| Element | Recommended Variable Pattern |
| :--- | :--- |
| **Accent Color** | `--color-accent` (or primary) |
| **Active Node** | `--color-accent-high` / `--color-accent-low` |
| **Inactive Node** | `--color-text-muted` / `--color-border-subtle` |
| **Canvas Background**| `--color-bg-canvas` |
| **Node Surface** | `--color-bg-surface` |

## Design Patterns

### 1. StepNode (Primary Content)
- **Visuals**: Centered icons, bold labels, and optional descriptions.
- **States**: 
    - `active`: Highlighted border, increased scale (e.g., 1.05 or 1.1), subtle glow.
    - `inactive`: Lower opacity, grayscale, or muted colors.

### 2. Config/Detail Node (Metadata)
- **Compactness**: Smaller, simpler nodes that provide context (e.g., files, credentials).
- **Edges**: Use dashed or dotted lines to distinguish from primary flow.

### 3. Animation & State
Use a controlled loop to guide the user's eye through the diagram:
- Use a `currentStep` state driven by an interval.
- Propagate `active` status to nodes and edges based on that index.

## Responsive Strategy
Design for flow adaptability:
- **Small Screens**: Vertical layout (Top-to-Bottom).
- **Large Screens**: Horizontal layout (Left-to-Right).
- Calculate positions based on container width or a flag (e.g., `isMobile`).

## Best Practices
- **Custom Handles**: Use invisible handles or custom port styles for a cleaner look.
- **Iconography**: Use consistent icon libraries (like Lucide) for all nodes.
- **Accessibility**: Ensure high contrast for active states and readable font sizes.

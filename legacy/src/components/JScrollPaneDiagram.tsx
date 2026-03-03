import React from 'react';
import ComponentHierarchy from './ComponentHierarchy';
import { HIERARCHY_CONFIGS } from './hierarchies/hierarchyConfigs';

export default function JScrollPaneDiagram() {
    return (
        <ComponentHierarchy
            config={HIERARCHY_CONFIGS.JScrollPaneViewport}
            description="Concepto de Viewport en JScrollPane"
        />
    );
}

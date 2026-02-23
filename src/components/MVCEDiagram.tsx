import React from 'react';
import ComponentHierarchy from './ComponentHierarchy';
import { HIERARCHY_CONFIGS } from './hierarchies/hierarchyConfigs';

export default function MVCEDiagram() {
    return (
        <ComponentHierarchy
            config={HIERARCHY_CONFIGS.MVCE}
            description="Flujo de Información Patrón MVC-E"
        />
    );
}

import React from 'react';
import ComponentHierarchy from './ComponentHierarchy';
import { HIERARCHY_CONFIGS } from './hierarchies/hierarchyConfigs';

export const JFrameHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JFrame}
        description="Jerarquía de JFrame"
    />
);

export const JPanelHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JPanel}
        description="Jerarquía de JPanel"
    />
);

export const JLabelHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JLabel}
        description="Jerarquía de JLabel"
    />
);

export const JButtonHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JButton}
        description="Jerarquía de JButton"
    />
);

export const JTextFieldHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JTextField}
        description="Jerarquía de JTextField"
    />
);

export const JTextAreaHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JTextArea}
        description="Jerarquía de JTextArea"
    />
);

export const JScrollPaneHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JScrollPane}
        description="Jerarquía de JScrollPane"
    />
);

export const JCheckBoxHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JCheckBox}
        description="Jerarquía de JCheckBox"
    />
);

export const JComboBoxHierarchy = () => (
    <ComponentHierarchy
        config={HIERARCHY_CONFIGS.JComboBox}
        description="Jerarquía de JComboBox"
    />
);

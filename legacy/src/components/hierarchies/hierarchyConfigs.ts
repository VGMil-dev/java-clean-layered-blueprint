import type { Node, Edge } from '@xyflow/react';

export interface HierarchyStep {
    nodes: string[];
    title: string;
    desc: string;
}

export interface HierarchyConfig {
    nodes: Node[];
    edges: Edge[];
    steps: HierarchyStep[];
}

const baseNodes = [
    { id: 'object', type: 'hierarchy', data: { label: 'Object', subtitle: 'java.lang', icon: 'object', isActive: false }, position: { x: 250, y: 0 } },
    { id: 'component', type: 'hierarchy', data: { label: 'Component', subtitle: 'java.awt', icon: 'component', isActive: false }, position: { x: 250, y: 120 } },
    { id: 'jcomponent', type: 'hierarchy', data: { label: 'JComponent', subtitle: 'javax.swing', icon: 'jcomponent', isActive: false }, position: { x: 250, y: 240 } },
];

const baseEdges = [
    { id: 'e-obj-comp', source: 'object', target: 'component', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
    { id: 'e-comp-jcomp', source: 'component', target: 'jcomponent', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
];

export const HIERARCHY_CONFIGS: Record<string, HierarchyConfig> = {
    JFrame: {
        nodes: [
            baseNodes[0], // Object
            baseNodes[1], // Component
            { id: 'container', type: 'hierarchy', data: { label: 'Container', subtitle: 'java.awt', icon: 'container', isActive: false }, position: { x: 250, y: 240 } },
            { id: 'window', type: 'hierarchy', data: { label: 'Window', subtitle: 'java.awt', icon: 'window', isActive: false }, position: { x: 250, y: 360 } },
            { id: 'jframe', type: 'hierarchy', data: { label: 'JFrame', subtitle: 'javax.swing', icon: 'jframe', isActive: false }, position: { x: 250, y: 480 } }
        ],
        edges: [
            baseEdges[0],
            { id: 'e-comp-cont', source: 'component', target: 'container', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-cont-win', source: 'container', target: 'window', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-win-jframe', source: 'window', target: 'jframe', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
        ],
        steps: [
            { nodes: ['object'], title: '1. Raíz Común', desc: 'Todo en Java hereda de Object.' },
            { nodes: ['component'], title: '2. Capacidades Visuales', desc: 'Define cómo se pinta y cómo recibe eventos.' },
            { nodes: ['container'], title: '3. Contenedor', desc: 'Capacidad de albergar otros componentes.' },
            { nodes: ['window'], title: '4. Ventana Base', desc: 'Superficie independiente sin bordes.' },
            { nodes: ['jframe'], title: '5. JFrame', desc: 'La ventana moderna de Swing con soporte de capas.' }
        ]
    },
    JButton: {
        nodes: [
            ...baseNodes,
            { id: 'abstractbutton', type: 'hierarchy', data: { label: 'AbstractButton', subtitle: 'javax.swing', icon: 'jcomponent', isActive: false }, position: { x: 250, y: 360 } },
            { id: 'jbutton', type: 'hierarchy', data: { label: 'JButton', subtitle: 'javax.swing', icon: 'jbutton', isActive: false }, position: { x: 250, y: 480 } }
        ],
        edges: [
            ...baseEdges,
            { id: 'e-jcomp-abs', source: 'jcomponent', target: 'abstractbutton', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-abs-btn', source: 'abstractbutton', target: 'jbutton', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } }
        ],
        steps: [
            { nodes: ['object'], title: 'Raíz Común', desc: 'Todo en Java hereda de Object.' },
            { nodes: ['component'], title: 'AWT Component', desc: 'Capacidades base de dibujo y eventos nativos.' },
            { nodes: ['jcomponent'], title: 'Swing JComponent', desc: 'Pintado ligero y arquitectura Swing.' },
            { nodes: ['abstractbutton'], title: 'Abstracción de Botón', desc: 'Define comportamiento común (click, icono, texto).' },
            { nodes: ['jbutton'], title: 'JButton Final', desc: 'El componente concreto listo para usar.' }
        ]
    },
    JLabel: {
        nodes: [
            ...baseNodes,
            { id: 'jlabel', type: 'hierarchy', data: { label: 'JLabel', subtitle: 'javax.swing', icon: 'jlabel', isActive: false }, position: { x: 250, y: 360 } }
        ],
        edges: [
            ...baseEdges,
            { id: 'e-jcomp-lbl', source: 'jcomponent', target: 'jlabel', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } }
        ],
        steps: [
            { nodes: ['object'], title: 'Raíz Común', desc: 'java.lang.Object' },
            { nodes: ['component'], title: 'AWT Component', desc: 'Renderizado base' },
            { nodes: ['jcomponent'], title: 'Swing JComponent', desc: 'Base de Swing' },
            { nodes: ['jlabel'], title: 'JLabel', desc: 'Hereda directamente de JComponent.' }
        ]
    },
    JPanel: {
        nodes: [
            ...baseNodes,
            { id: 'jpanel', type: 'hierarchy', data: { label: 'JPanel', subtitle: 'javax.swing', icon: 'jpanel', isActive: false }, position: { x: 250, y: 360 } }
        ],
        edges: [
            ...baseEdges,
            { id: 'e-jcomp-pnl', source: 'jcomponent', target: 'jpanel', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } }
        ],
        steps: [
            { nodes: ['object'], title: 'Raíz Común', desc: 'java.lang.Object' },
            { nodes: ['component'], title: 'AWT Component', desc: 'Renderizado base' },
            { nodes: ['jcomponent'], title: 'Swing JComponent', desc: 'Base de Swing' },
            { nodes: ['jpanel'], title: 'JPanel', desc: 'Hereda directamente de JComponent.' }
        ]
    },
    JTextField: {
        nodes: [
            ...baseNodes,
            { id: 'jtextcomp', type: 'hierarchy', data: { label: 'JTextComponent', subtitle: 'javax.swing.text', icon: 'jcomponent', isActive: false }, position: { x: 250, y: 360 } },
            { id: 'jtextfield', type: 'hierarchy', data: { label: 'JTextField', subtitle: 'javax.swing', icon: 'jtextfield', isActive: false }, position: { x: 250, y: 480 } }
        ],
        edges: [
            ...baseEdges,
            { id: 'e-jcomp-txt', source: 'jcomponent', target: 'jtextcomp', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-txt-fld', source: 'jtextcomp', target: 'jtextfield', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } }
        ],
        steps: [
            { nodes: ['object'], title: '1. Raíz Común', desc: 'java.lang.Object' },
            { nodes: ['component'], title: '2. AWT Component', desc: 'Renderizado base' },
            { nodes: ['jcomponent'], title: '3. Swing JComponent', desc: 'Base de Swing' },
            { nodes: ['jtextcomp'], title: '4. JTextComponent', desc: 'Base para todos los componentes de texto.' },
            { nodes: ['jtextfield'], title: '5. JTextField', desc: 'El campo de texto de una sola línea.' }
        ]
    },
    JTextArea: {
        nodes: [
            ...baseNodes,
            { id: 'jtextcomp', type: 'hierarchy', data: { label: 'JTextComponent', subtitle: 'javax.swing.text', icon: 'jcomponent', isActive: false }, position: { x: 250, y: 360 } },
            { id: 'jtextarea', type: 'hierarchy', data: { label: 'JTextArea', subtitle: 'javax.swing', icon: 'jtextfield', isActive: false }, position: { x: 250, y: 480 } }
        ],
        edges: [
            ...baseEdges,
            { id: 'e-jcomp-txt', source: 'jcomponent', target: 'jtextcomp', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-txt-area', source: 'jtextcomp', target: 'jtextarea', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } }
        ],
        steps: [
            { nodes: ['object'], title: '1. Raíz Común', desc: 'java.lang.Object' },
            { nodes: ['component'], title: '2. AWT Component', desc: 'Renderizado base' },
            { nodes: ['jcomponent'], title: '3. Swing JComponent', desc: 'Base de Swing' },
            { nodes: ['jtextcomp'], title: '4. JTextComponent', desc: 'Base para todos los componentes de texto.' },
            { nodes: ['jtextarea'], title: '5. JTextArea', desc: 'El campo de texto multilínea.' }
        ]
    },
    JScrollPane: {
        nodes: [
            baseNodes[0], // Object
            baseNodes[1], // Component
            { id: 'container', type: 'hierarchy', data: { label: 'Container', subtitle: 'java.awt', icon: 'container', isActive: false }, position: { x: 250, y: 240 } },
            baseNodes[2], // JComponent (position needs adjustment if we want it to follow Container)
            { id: 'jscrollpane', type: 'hierarchy', data: { label: 'JScrollPane', subtitle: 'javax.swing', icon: 'jcomponent', isActive: false }, position: { x: 250, y: 480 } }
        ],
        edges: [
            baseEdges[0],
            { id: 'e-comp-cont', source: 'component', target: 'container', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-cont-jcomp', source: 'container', target: 'jcomponent', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-jcomp-scroll', source: 'jcomponent', target: 'jscrollpane', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } }
        ],
        steps: [
            { nodes: ['object'], title: '1. Raíz Común', desc: 'java.lang.Object' },
            { nodes: ['component'], title: '2. AWT Component', desc: 'Habilidades base' },
            { nodes: ['container'], title: '3. Container', desc: 'Capacidad de contener otros componentes.' },
            { nodes: ['jcomponent'], title: '4. JComponent', desc: 'Base del ecosistema Swing.' },
            { nodes: ['jscrollpane'], title: '5. JScrollPane', desc: 'Contenedor especializado con barras de desplazamiento.' }
        ]
    },
    MVCE: {
        nodes: [
            { id: 'user', type: 'hierarchy', data: { label: 'Usuario', subtitle: 'Actor', icon: 'user', isActive: false }, position: { x: 0, y: 100 } },
            { id: 'view', type: 'hierarchy', data: { label: 'Vista', subtitle: 'JFrame', icon: 'view', isActive: false }, position: { x: 250, y: 100 } },
            { id: 'event', type: 'hierarchy', data: { label: 'Evento', subtitle: 'ActionListener', icon: 'event', isActive: false }, position: { x: 500, y: 100 } },
            { id: 'orchestrator', type: 'hierarchy', data: { label: 'Orquestador', subtitle: 'Controlador', icon: 'orchestrator', isActive: false }, position: { x: 750, y: 100 } },
            { id: 'model', type: 'hierarchy', data: { label: 'Modelo', subtitle: 'Lógica', icon: 'model', isActive: false }, position: { x: 1000, y: 100 } },
        ],
        edges: [
            { id: 'e-user-view', source: 'user', target: 'view', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-view-event', source: 'view', target: 'event', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-event-orch', source: 'event', target: 'orchestrator', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-orch-model', source: 'orchestrator', target: 'model', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
        ],
        steps: [
            { nodes: ['user'], title: "1. Acción del Usuario", desc: "El usuario interactúa con un componente de la interfaz (ej: hace clic en un botón)." },
            { nodes: ['view'], title: "2. Reacción de la Vista", desc: "La Vista captura la interacción física pero no sabe qué hacer con ella." },
            { nodes: ['event'], title: "3. Disparo del Evento", desc: "La Vista delega la acción a la clase Evento (ActionListener) que está 'escuchando'." },
            { nodes: ['orchestrator'], title: "4. Aviso al Orquestador", desc: "El Evento notifica al Orquestador que algo ha sucedido y requiere procesamiento." },
            { nodes: ['model'], title: "5. Lógica en el Modelo", desc: "El Orquestador pide al Modelo que procese los datos (ej: cálculos, validaciones)." },
            { nodes: ['orchestrator'], title: "6. Retorno de Datos", desc: "El Modelo devuelve el resultado procesado al Orquestador para su entrega." },
            { nodes: ['view'], title: "7. Actualización Visual", desc: "El Orquestador indica a la Vista que muestre el resultado final al usuario." },
        ]
    },
    JScrollPaneViewport: {
        nodes: [
            { id: 'content', type: 'hierarchy', data: { label: 'Client Component', subtitle: 'La Cartulina Gigante', icon: 'jcomponent', isActive: false }, position: { x: 600, y: 100 } },
            { id: 'viewport', type: 'hierarchy', data: { label: 'Viewport', subtitle: 'Ventana de Observación', icon: 'view', isActive: false }, position: { x: 250, y: 100 } },
            { id: 'scrollbars', type: 'hierarchy', data: { label: 'Scrollbars', subtitle: 'Barras de Desplazamiento', icon: 'orchestrator', isActive: false }, position: { x: 250, y: 350 } },
        ],
        edges: [
            { id: 'e-vp-content', source: 'viewport', target: 'content', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-sb-vp', source: 'scrollbars', target: 'viewport', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
        ],
        steps: [
            { nodes: ['content'], title: '1. El Componente Cliente', desc: 'Representa el contenido total (ej: una imagen gigante o una tabla con miles de filas).' },
            { nodes: ['viewport'], title: '2. El Viewport', desc: 'Es el "hueco" o ventana por el que miramos. Solo vemos una fracción del contenido total.' },
            { nodes: ['scrollbars'], title: '3. Control de Posición', desc: 'Las barras coordinan qué sección del componente cliente debe alinearse con el viewport.' },
            { nodes: ['viewport', 'content'], title: '4. Interacción Fluida', desc: 'Al usuario le parece que mueve el contenido, pero técnicamente movemos la "cámara" (viewport) sobre él.' }
        ]
    },
    JCheckBox: {
        nodes: [
            ...baseNodes,
            { id: 'abstractbutton', type: 'hierarchy', data: { label: 'AbstractButton', subtitle: 'javax.swing', icon: 'jcomponent', isActive: false }, position: { x: 250, y: 360 } },
            { id: 'jtogglebutton', type: 'hierarchy', data: { label: 'JToggleButton', subtitle: 'javax.swing', icon: 'jcomponent', isActive: false }, position: { x: 250, y: 480 } },
            { id: 'jcheckbox', type: 'hierarchy', data: { label: 'JCheckBox', subtitle: 'javax.swing', icon: 'jcheckbox', isActive: false }, position: { x: 250, y: 600 } }
        ],
        edges: [
            ...baseEdges,
            { id: 'e-jcomp-abs', source: 'jcomponent', target: 'abstractbutton', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-abs-tog', source: 'abstractbutton', target: 'jtogglebutton', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } },
            { id: 'e-tog-chk', source: 'jtogglebutton', target: 'jcheckbox', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } }
        ],
        steps: [
            { nodes: ['object'], title: 'Raíz', desc: 'Object' },
            { nodes: ['jcomponent'], title: 'Base Swing', desc: 'JComponent' },
            { nodes: ['abstractbutton'], title: 'Abstracción', desc: 'Define estados comunes (presionado, seleccionado).' },
            { nodes: ['jtogglebutton'], title: 'Botón de Estado', desc: 'Base para botones que mantienen su estado.' },
            { nodes: ['jcheckbox'], title: 'JCheckBox', desc: 'El componente final para selecciones binarias.' }
        ]
    },
    JComboBox: {
        nodes: [
            ...baseNodes,
            { id: 'jcombobox', type: 'hierarchy', data: { label: 'JComboBox', subtitle: 'javax.swing', icon: 'jcombobox', isActive: false }, position: { x: 250, y: 360 } }
        ],
        edges: [
            ...baseEdges,
            { id: 'e-jcomp-cmb', source: 'jcomponent', target: 'jcombobox', type: 'cinematic', style: { stroke: 'rgba(var(--sl-color-accent-rgb), 0.25)', strokeWidth: 4, opacity: 0.7 } }
        ],
        steps: [
            { nodes: ['object'], title: 'Raíz', desc: 'Object' },
            { nodes: ['jcomponent'], title: 'Base Swing', desc: 'JComponent' },
            { nodes: ['jcombobox'], title: 'JComboBox', desc: 'Lista desplegable que permite selección única.' }
        ]
    }
};

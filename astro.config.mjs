// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
    integrations: [starlight({
        title: 'RepoJava',
        logo: {
            src: './src/assets/logo.png',
        },
        customCss: [
            './src/styles/custom.css',
            '@fontsource/jetbrains-mono/400.css',
            '@fontsource/jetbrains-mono/600.css',
        ],
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
        sidebar: [
            {
                label: 'Swing',
                collapsed: false,
                items: [
                    { label: 'JFrame: El Edificio', link: '/04-swing/01-jframe' },
                    { label: 'JPanel: El Lienzo', link: '/04-swing/02-jpanel' },
                    {
                        label: 'Componentes Básicos',
                        items: [
                            { label: 'JLabel: Etiquetas', link: '/04-swing/03-jlabel' },
                            { label: 'JButton: Botones', link: '/04-swing/04-jbutton' },
                            { label: 'JTextField: Campos de Texto', link: '/04-swing/05-jtextfield' },
                            { label: 'JTextArea: Bloques de Texto', link: '/04-swing/06-jtextarea' },
                            { label: 'JScrollPane: Desplazamiento', link: '/04-swing/07-jscrollpane' },
                        ]
                    },
                    {
                        label: 'Laboratorio: MVC-E',
                        items: [
                            { label: 'Introducción', link: '/04-swing/08-laboratorio-mvce' },
                            {
                                label: '1. Modelos',
                                autogenerate: { directory: '04-swing/08-laboratorio-mvce/01-modelos' },
                            },
                            {
                                label: '2. Vistas',
                                autogenerate: { directory: '04-swing/08-laboratorio-mvce/02-vistas' },
                            },
                            {
                                label: '3. Controladores',
                                autogenerate: { directory: '04-swing/08-laboratorio-mvce/03-controladores' },
                            },
                            { label: '4. Clase Principal', link: '/04-swing/08-laboratorio-mvce/04-principal' },
                        ]
                    },
                ],
            },
        ],
    }), react()],

    vite: {
        plugins: [tailwindcss()],
    },
});
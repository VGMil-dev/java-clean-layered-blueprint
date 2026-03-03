// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import mermaid from 'astro-mermaid';

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
                    {
                        label: 'Componentes Básicos',
                        autogenerate: { directory: '04-swing/02-componentes-basicos' }
                    },
                    {
                        label: 'Laboratorio: MVC-E',
                        items: [
                            { label: 'Introducción', link: '/04-swing/03-laboratorio-mvce' },
                            {
                                label: '1. Modelos',
                                autogenerate: { directory: '04-swing/03-laboratorio-mvce/01-modelos' },
                            },
                            {
                                label: '2. Vistas',
                                autogenerate: { directory: '04-swing/03-laboratorio-mvce/02-vistas' },
                            },
                            {
                                label: '3. Controladores',
                                autogenerate: { directory: '04-swing/03-laboratorio-mvce/03-controladores' },
                            },
                            { label: '4. Clase Principal', link: '/04-swing/03-laboratorio-mvce/04-principal' },
                        ]
                    },
                    {
                        label: 'Fortalecimiento MVCE',
                        autogenerate: { directory: '04-swing/04-fortalecimiento-mvce' },
                    },
                ],
            },
        ],
    }), react(), mermaid()],

    vite: {
        plugins: [tailwindcss()],
    },
});
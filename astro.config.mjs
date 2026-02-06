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
                items: [
                    { label: 'JFrame y JPanel', link: '/04-swing/01-jframe-jpanel' },
                ],
            },
        ],
    }), react()],

    vite: {
        plugins: [tailwindcss()],
    },
});
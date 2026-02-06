// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'RepoJava',
			logo: {
				src: './src/assets/logo.png',
			},
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
				// Fonts
				'@fontsource/jetbrains-mono/400.css',
				'@fontsource/jetbrains-mono/600.css',
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [

			],
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
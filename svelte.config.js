import adapter from '@sveltejs/adapter-static';

const base = (process.env.BASE_PATH ?? '').replace(/\/$/, '');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base
		},
		alias: {
			$story: 'src/story',
			$components: 'src/components',
			$data: 'src/data',
			$runes: 'src/runes',
			$styles: 'src/styles'
		}
	}
};

export default config;
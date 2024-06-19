import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import packageJson from './package.json';
import copy from 'rollup-plugin-copy';
import * as fse from 'fs-extra';
import path from 'path';
import process from 'process';
import modules from './modules.json';
import externals from './externals.json';

// In/out directories
const SOURCE_DIR = 'build/tmp/javascript/';
const OUTPUT_DIR = 'dist/';
const WEBJARS_DIR = 'src/main/resources/META-INF/resources/webjars/';

// Clean up node module directories and copy external node modules
console.log(`\x1b[32mEmptying ${OUTPUT_DIR}\x1b[39m\n`);
fse.emptyDirSync(OUTPUT_DIR);

console.log(`\x1b[32mEmptying ${WEBJARS_DIR}\x1b[39m\n`);
fse.emptyDirSync(WEBJARS_DIR);

if (0 < Object.keys(externals).length) {
	console.log(`\x1b[32mCopying external node modules to ${WEBJARS_DIR}\x1b[39m`);
	console.log(``);
	const filter = (src) => src.endsWith("/") || src.endsWith(".js") || src.endsWith(".js.map");
	for (let external in externals) {
		const data = require(`${external}/package.json`);
		const source = path.relative(
			process.cwd(),
			path.dirname(require.resolve(`${external}/${data.bundle || data.main}`))
		).replaceAll(path.sep, "/") + "/";
		const destination = `${WEBJARS_DIR}${path.basename(external)}/${data.version}/`
		console.log(`\x1b[36m\x1b[1m${source}\x1b[22m → \x1b[1m${destination}\x1b[22m\x1b[39m`);
		fse.copySync(source, destination, { filter });
	}
	console.log(``);
}

// Product
console.log(`\x1b[32mGenerating application-product.properties\x1b[39m\n`);
fse.writeFileSync(
	`src/main/resources/application-product.properties`,
	`product.name=${packageJson.name}\n` +
	`product.description=${packageJson.description}\n` +
	`product.version=${packageJson.version}\n`
);

// Banner
const newBanner = (title, version) => {
	return (
		`/*\n` +
		` ${title} v${version}\n` +
		`*/`
	);
};

const newTerser = (banner) => {
	if (process.env.ROLLUP_WATCH) {
		return {};
	}
	return terser({
		output: {
			preamble: banner
		}
	});
};

const build = (source, outfile, globalName) => {
	const banner = newBanner(packageJson.name, packageJson.version);
	const file = `${OUTPUT_DIR}${outfile}.min.js`;
	return {
		input: `${SOURCE_DIR}${source}.js`,
		output: [{
			name: globalName,
			file,
			format: 'iife',
			banner,
			globals: externals
		}],
		plugins: [
			resolve(),
			commonjs(),
			newTerser(banner),
			copy({
				targets: [
					{
						src: file,
						dest: `${WEBJARS_DIR}${path.basename(packageJson.name)}/${packageJson.version}/`
					}
				],
				hook: 'writeBundle'
			})
		],
		external: Object.keys(externals)
	};
};

console.log(`\x1b[32mBuilding modules\x1b[39m`);
export default modules.map((module) => build(module[0], module[1], module[2]));

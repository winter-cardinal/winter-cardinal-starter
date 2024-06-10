const esbuild = require('esbuild');
const egp = require('esbuild-plugin-external-global');
const fse = require('fs-extra');
const { setTimeout } = require('timers/promises');
const packageJson = require('./package.json');
const path = require('path');
const process = require('process');
const modules = require('./modules.json');
const externals = require('./externals.json');

// In/out directories
const SOURCE_DIR = 'src/main/typescript/';
const OUTPUT_DIR = "dist/";
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

// ESBuild setup
const toMtime = async (file) => {
	try {
		return (await fse.stat(file)).mtime.getTime();
	} catch (e) {
		return 0;
	}
};

const copy = async (module, webjarDir) => {
	const source = module[0];
	const destination = module[1];
	const sfile = `build/tmp/esbuild/${source}.js`;
	const dfile1 = `${webjarDir}${destination}.min.js`;
	const dfile2 = `${OUTPUT_DIR}${destination}.min.js`;
	const mtimes = await Promise.all([toMtime(sfile), toMtime(dfile1)]);
	if (mtimes[0] !== mtimes[1]) {
		console.log(`\x1b[36m\x1b[1m${source}.ts\x1b[22m → \x1b[1m${destination}.min.js\x1b[22m\x1b[39m\n`);
		await Promise.all([
			fse.copy(sfile, dfile1, { preserveTimestamps: true }),
			fse.copy(sfile, dfile2, { preserveTimestamps: true })
		]);
	}
};

const build = async (modules, globalName, webjarDir, isWatchMode) => {
	const context = await esbuild.context({
		entryPoints: modules.map((module) => `${SOURCE_DIR}${module[0]}.ts`),
		target: "es6",
		format: "iife",
		globalName,
		bundle: true,
		outdir: "build/tmp/esbuild/",
		external: Object.keys(externals),
		plugins: [
			egp.externalGlobalPlugin(externals),
			{
				name: "copy",
				setup(build) {
					build.onEnd(async () => {
						const copyings = [];
						for (let i = 0, imax = modules.length; i < imax; ++i) {
							copyings.push(copy(modules[i], webjarDir));
						}
						await Promise.all(copyings);
					});
				}
			}
		],
		minify: false
	});
	if (isWatchMode) {
		await context.watch();
	} else {
		await context.rebuild();
	}
	return context;
};

const close = async (contexts) => {
	console.log("Closing contexts...");
	const disposings = [];
	for (let i = 0, imax = contexts.length; i < imax; ++i) {
		disposings.push(contexts[i].dispose());
	}
	await Promise.all(disposings);
	console.log("Done");
};

(async () => {
	const isWatchMode = 0 < process.argv.indexOf("-w");
	console.log(`\x1b[32mBuilding modules\x1b[39m\n`);
	const startTime = Date.now();
	const moduleMap = new Map();
	modules.forEach((module) => {
		const moduleList = moduleMap.get(module[2]);
		if (moduleList == null) {
			moduleMap.set(module[2], [module]);
		} else {
			moduleList.push(module);
		}
	});
	const builds = [];
	const dest = `${WEBJARS_DIR}${path.basename(packageJson.name)}/${packageJson.version}/`;
	moduleMap.forEach((moduleList, globalName) => {
		builds.push(
			build(moduleList, globalName, dest, isWatchMode)
		);
	});
	const contexts = await Promise.all(builds);
	if (isWatchMode) {
		process.on('SIGINT', async () => {
			await close(contexts);
			process.exit(0);
		});

		while (true) {
			await setTimeout(100);
		}
	} else {
		console.log(`\x1b[32mBuilding modules took ${Date.now() - startTime}ms\x1b[39m\n`);
		await close(contexts);
	}
})();

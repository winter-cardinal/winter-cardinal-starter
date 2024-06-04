# WinterCardinal Starter

A starter for WinterCardinal projects.
This starter includes:

* Gradle (`build.gradle`, `gradlew`, `gradlew.bat`, `gradle/`)
* Lombok (`build.gradle`)
* JNA (`build.gradle`)
* WinterCardinal (`build.gradle`, `package.json`)
* WinterCardinal UI (`package.json`)
* PixiJS (`package.json`)
* TypeScript Compiler (`tsconfig.json`)
	* TypeScript Codes get transpiled to ES5 at the Production Build
	* TypeScript Codes get transpiled to ES6 at the Development Build
* TypeScript Linter (`.eslintrc.json`, `.eslintignore`)
* Bundlers (`rollup.config.js`, `esbuild.config.js`, `modules.json`, `externals.json`)
* Static Resource (`src/main/java/app/secutrity/WebSecurityConfig.java`)
* Sign-In Page (`src/main/resouces/templates/signin.html`)
* Error Page (`src/main/resources/templates/error.html`, `src/main/java/mvc/MvcErrorController.java`)
* Account Entity (`src/main/java/app/db/account/*`)
* MVC Controllers (`src/main/java/app/mvc/*`)
* Page Controllers (`src/main/java/app/page/*`)
* Top Page with a DDiagram sample (`src/main/typescript/top/*`)
* I18N (`src/main/java/app/i18n/*`, `src/main/resources/i18n/*`, `src/main/resources/templates/*`, `src/main/java/app/mvc/MvcMessageScriptController.java`)
* H2 DB (`build.gradle`)

## How to Run the Production Build

1. Build TypeScript codes by the command `npm run build`.
2. Execute `./gradlew bootRun` to start the web server.
(`./gradlew build` followed with `java -jar ./build/libs/${jar-file-name}.jar` works as well.)

To stop the web server, please hit the `Ctrl+C`.

## How to Run the Development Build

1. Build TypeScript codes by the command `npm run build:esbuild` or `npm run watch:esbuild`.
2. Run `src/main/java/Main.java` with your IDE.

## Compiling Java Codes

### Production Build

```
./gradlew build
```

The compiled JAR files are located in `build\libs\`.

### Development Build

Please build `src/main/java/Main.java` with your IDE.

## Compiling TypeScript Codes

### Production Build

```
npm run build
```

### Development Build (Clean Build)

```
npm run build:esbuild
```

### Development Build (Incremental Build)

```
npm run watch:esbuild
```

## Proxy

### Gradle

```
# ~/.gradle/gradle.properties
systemProp.http.proxyHost=proxy-host
systemProp.http.proxyPort=proxy-port
systemProp.http.nonProxyHosts=no-proxy-host-a|no-proxy-host-b
systemProp.https.proxyHost=proxy-host
systemProp.https.proxyPort=proxy-port
systemProp.https.nonProxyHosts=no-proxy-host-a|no-proxy-host-b
```

### NPM

```
# ~/.npmrc
proxy=http://proxy-host:proxy-port/
https-proxy=http://proxy-host:proxy-port/
noproxy[]=no-proxy-host-a
noproxy[]=no-proxy-host-b
```

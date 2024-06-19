# WinterCardinal Starter

A starter for WinterCardinal projects.

## How to Run the Production Build

1. Build TypeScript codes by the command `npm install` followed by `npm run build`.
2. Then execute `./gradlew bootRun` to start the web server.
`./gradlew build` followed by `java -jar ./build/libs/${jar-file-name}.jar` works as well.

To stop the web server, please hit the `Ctrl+C`.

## How to Run the Development Build

1. Build TypeScript codes by the commands `npm install` and `npm run build:esbuild`.
If you want to build incrementally, please type `npm install` and `npm run watch:esbuild` instead.
2. Then run `src/main/java/Main.java` with your IDE.

## Compiling Java Codes

### Production Build

```
./gradlew build
```

The compiled JAR files are located in `build\libs\`.

### Development Build

Please build `src/main/java/Main.java` with your IDE.

## Compiling TypeScript Codes

To begin, if you haven't done `npm install` before, please do it. `npm install` need to be performed at least once.
Once `npm install` is executed, it doesn't need to be executed unless the dependencies listed in the `package.json` get changed.

### Production Build

```
npm run build
```

The compiled JS files are located in `src\main\resources\META-INF\resources\webjars\`.

### Development Build (Clean Build)

```
npm run build:esbuild
```

### Development Build (Incremental Build)

```
npm run watch:esbuild
```

## Linting Java Codes

```
./gradlew spotlessCheck
```

or

```
./gradlew spotlessApply
```

to fix all the lint errors.

## Linting TypeScript Codes

```
npm run lint
```

or

```
npm run lint:fix
```

to fix all the auto-fixable lint errors.

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

## License

* Apache License Version 2.0.

* Icons are from Material design icons developed by Google and licensed under Apache license version 2.0.\
https://github.com/google/material-design-icons


# Assesment demo

## How to run

```
cd rootDirectoryOfProject
npm i
npm start
```

## Stackblitz support
You can connect the stackblitz node demo instance to this repo, it will overwrite the files and then in the terminal run

```
npm i
npm start
```
The container output should look like this:

```
{"name":"James, LeBron","above50":6,"bellow50":1}
```

## Implementation info

The code is written with SOLID in mind and is a **demo**.

This means that it *may* contain bugs and *does not* handle all possible edge cases. However the code
is structured in a way that is extreamly easy to extend, test and allow for re-exposing the main functionality 
in different manners (i.e. CLI, cloud fn etc.)

One of the main requirements was to keep in mind that the **'LeBron'** usecase is to be
extended soon, thus the functionality is generalized, and instead the 'LeBron' usage is
made the specific (i.e. exposed as `/` for demo).

Test were to be done with jest (ts-jest), however the time was not sufficient. Also no
DI container was added for time restrictions, but a suitable one would be 
[inversify](https://github.com/inversify/InversifyJS). Insead of DI container, manual instantiation was used as the demo is small enough to support this approach.


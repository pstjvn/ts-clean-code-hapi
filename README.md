# Assesment demo

## How to run

```
cd rootDirectoryOfProject
npm i
npm start
```
Then open the url seen in the console in your browser 

## Stackblitz support
You can connect the stackblitz node demo instance to this repo, it will overwrite the files and then in the terminal run

```
npm i
npm start
```
The container output should present a form with a search field, enter the name you'd like to search for stats and press enter of the 'Go' button. The result would look something like this when a player is recognized.

```
{"name":"James, LeBron","above50":6,"bellow50":1}
```

If a player matching the search term is not found the output would look like this:

```
{"isError":true,"message":"Query cannot be completed","detail":"No user found matching search term"}
```

## Implementation info

The code is written with SOLID in mind and is a **demo**.

Тhe code is structured in a way that is extreamly easy to extend, test and allow for 
re-exposing the main functionality in different manners (i.e. CLI, cloud fn etc.)

One of the main requirements was to keep in mind that the **'LeBron'** usecase is to be
extended soon, thus the functionality is generalized, and instead the 'LeBron' usage is
made the specific.

The following URLs are exposed:

`/ `- The main HTML 
`/lebronjames` - stats specific for lebron
`/stats?search=search_term` - search for first matching player's stats

Test were to be done with jest (ts-jest), however the time was not sufficient. Also no
DI container was added for time restrictions, but a suitable one would be 
[inversify](https://github.com/inversify/InversifyJS). Insead of DI container, manual instantiation was used as the demo is small enough to support this approach.


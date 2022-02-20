import { GamesCountUsecase } from './domain/usecase/games-count';
import { PlayerRepository } from './data/repository/player.repository';
import { SeasonRepository } from './data/repository/season.repository';
import { BallDontLie } from './data/datasource/balldontlie';
import { getPlayerSeasonsControllerFactory } from './presentation/controller/player-games';
import { getPlayerStats } from './presentation/routes/get.player.games';

import * as Hapi from '@hapi/hapi';
import { getLeBronSeasonsControllerFactory } from './presentation/controller/lebron-games';
import { getLeBronStats } from './presentation/routes/get.lebron.games';

async function createServerInstance(di?: any): Promise<Hapi.Server> {
  let server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  });
  await loadPlugins(server, di);
  return server;
}

async function loadPlugins(server: Hapi.Server, di?: any) {
    // Initialization should be done by DI, but this is a demo so no IOC.
    let bdl = new BallDontLie();
    let playerRepo = new PlayerRepository(bdl);
    let seasonRepo = new SeasonRepository(bdl);
    let useCase = new GamesCountUsecase(playerRepo, seasonRepo);
    let playerStatsCtrl = getPlayerSeasonsControllerFactory(useCase);
    let playerStatsRoute = getPlayerStats(playerStatsCtrl);
    await server.register(playerStatsRoute);

    // Now for our edge case - looking up only LeBron James' stats and putting it
    // as the main URL for the demo to work.
    let leBronStatsCtrl = getLeBronSeasonsControllerFactory(useCase);
    let leBronStatsRoute = getLeBronStats(leBronStatsCtrl);
    await server.register(leBronStatsRoute);
}

/**
 * Used for testing the route registrations.
 */
export const init = async function(di?: any): Promise<Hapi.Server> {
  let server = await createServerInstance(di);
  await server.initialize();
  return server;
};

/**
 * Call this method to go into production.
 * The default initializers will be used to load the dependencies and
 * provide the routes.
 */
export const start = async function(): Promise<Hapi.Server> {
  let server = await createServerInstance(); // Here we can pass in the DI container instance.
  await server.start();
  console.log(`Listening on ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', function(err) {
  console.log(err);
  process.exit(1);
});
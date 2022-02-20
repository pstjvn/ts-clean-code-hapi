import { AboveBellow50Games, SerializedError } from "../controller/player-games";
import { Request, ResponseToolkit } from '@hapi/hapi';

export const getPlayerStats = (controller: (req: Request, h: ResponseToolkit)=> Promise<AboveBellow50Games|SerializedError>) => {
    return {
        name: 'GetPlayerStats',
        version: '1.0.0',
        register: async function(server) {
          server.route({
            method: 'GET',
            path: '/stats',
            handler: controller,
            options: { cors: true }
          });
        }
      };
}
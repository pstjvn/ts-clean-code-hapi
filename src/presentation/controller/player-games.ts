import { Failure } from "../../core/failure"
import { PlayCount } from "../../domain/entity/play-count";
import { GamesCountUsecase } from "../../domain/usecase/games-count"
import { Request, ResponseToolkit } from '@hapi/hapi';

export type AboveBellow50Games = {
    name: string,
    above50: number,
    bellow50: number
}

export type SerializedError = {
    isError: true, 
    message: string,
    detail: string
}

/**
 * This should possibly be in an utility collection as building an API would 
 * require consistency of the returned data...
 */
export const serializePlayerSeasonsSummary = (data: PlayCount | Failure): AboveBellow50Games | SerializedError => {
    if (data instanceof Failure) {
        return {
            isError: true,
            message: 'Query cannot be completed',
            detail: data.message
        };
    } else {
        return {
            name: `${data.player.lastName}, ${data.player.firstName}`,
            above50: data.aboveFifthyCount,
            bellow50: data.bellowFifthyCount
        };
    }
}

export const getPlayerSeasonsControllerFactory = (
    useCase: GamesCountUsecase): (req: Request, h: ResponseToolkit)=> Promise<AboveBellow50Games|SerializedError> => {
    return async (req: Request, h: ResponseToolkit) => {
        let searchName = req.params.search;
        if (!searchName) return serializePlayerSeasonsSummary(new Failure('No player name selected'));
        let seasonsInfo = await useCase.getGameSpread(searchName);
        let result = serializePlayerSeasonsSummary(seasonsInfo);
        return result;
    };
}
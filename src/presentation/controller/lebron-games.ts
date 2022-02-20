import { GamesCountUsecase } from "../../domain/usecase/games-count"
import { Request, ResponseToolkit } from '@hapi/hapi';
import { AboveBellow50Games, SerializedError, serializePlayerSeasonsSummary } from "./player-games";

export const getLeBronSeasonsControllerFactory = (
    useCase: GamesCountUsecase): (req: Request, h: ResponseToolkit)=> Promise<AboveBellow50Games|SerializedError> => {
    return async (req: Request, h: ResponseToolkit) => {
        let searchName = 'lebron james';
        let seasonsInfo = await useCase.getGameSpread(searchName);
        let result = serializePlayerSeasonsSummary(seasonsInfo);
        return result;
    };
}
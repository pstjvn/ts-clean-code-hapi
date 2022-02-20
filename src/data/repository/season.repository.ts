import { Failure } from '../../core/failure';
import { Player } from '../../domain/entity/player';
import { SeasonAverage } from '../../domain/entity/season-average';
import { BallDontLie } from '../datasource/balldontlie';
import { fromPOJO } from '../model/season-averages';


export class SeasonRepository {
    constructor(private ballDatasource: BallDontLie) {}

    async getSeasonAverages(player: Player|Failure, season: string): Promise<SeasonAverage|Failure> {
        if (player instanceof Failure) return player;
        let id = player.id;
        try {
            let data = await this.ballDatasource.getSeasonAverages(id, season);
            let result = fromPOJO(data);
            return result;
        } catch (e) {
            return new Failure(e);
        }
    }

    async getSeasonsAverages(player: Player|Failure, seasons: string[]): Promise<SeasonAverage[]|Failure> {
        if (player instanceof Failure) return player;
        let promises = seasons.map((season) => this.getSeasonAverages(player, season));
        let responses = await Promise.all(promises);
        let potentialFailure: Failure = responses.find(r => r instanceof Failure) as Failure | undefined;
        if (potentialFailure) 
            return potentialFailure;
        else 
            return responses as SeasonAverage[];
    }
}
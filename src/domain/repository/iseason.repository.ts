import { Failure } from '../../core/failure';
import { Player } from '../entity/player';
import { SeasonAverage } from '../entity/season-average';

export interface ISeasonRepository {
    getSeasonAverages(player: Player|Failure, season: string): Promise<SeasonAverage|Failure>;
    getSeasonsAverages(player: Player|Failure, seasons: string[]): Promise<SeasonAverage[]|Failure>;
}
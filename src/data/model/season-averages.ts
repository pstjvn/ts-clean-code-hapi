import { SeasonAverage } from '../../domain/entity/season-average';
import { SeasonAverageItemDTO } from '../datasource/balldontlie';

export function fromPOJO(data: SeasonAverageItemDTO): SeasonAverage {
    let p = new SeasonAverage();
    p.gamesPlayed = data.games_played;
    p.season = data.season;
    return p;
}
import { Axios } from "axios";

type ResponseCollection<T> = {
    data: T[]
}
export type SeasonAverageItemDTO = {
    games_played: number,
    player_id: number,
    season: number
}
export type PlayerInfoItemDTO = {
    id: number
    first_name: string
    last_name: string
}
type PlayerInfoDTOCollection = ResponseCollection<PlayerInfoItemDTO>;
type SeasonAverageDTOCollection = ResponseCollection<SeasonAverageItemDTO>;


export class BallDontLie {
    constructor(
        private httpClient: Axios = new Axios({
            responseType: 'json'
        }), 
        
        private url: string = 'https://www.balldontlie.io/api/v1') {}


    private unwrapCollection<T>(response: string): T {
        let parsed: ResponseCollection<T> = JSON.parse(response);
        if (parsed.data && typeof parsed.data.length === 'number' && parsed.data.length > 0) {
            return parsed.data[0];
        } else {
            throw new Error('No response data found');
        }
    }

    async findPlayerByName(name: string): Promise<PlayerInfoItemDTO> {
        let result = await this.httpClient.get<string>(`${this.url}/players`, {
            params: {
                search: name
            }
        });
        if (result.status === 200) {
            return this.unwrapCollection<PlayerInfoItemDTO>(result.data);
        } else {
            throw new Error(`Could not fetch user by name: ${name}`);
        }
    }

    /**
     * Given a player, obtain the season averages info. The season is in the
     * format of 'YYYY'.
     */
    async getSeasonAverages(playerId: number, season: string): Promise<SeasonAverageItemDTO> {
        let result = await this.httpClient.get<string>(`${this.url}/season_averages`, {
            params: {
                player_ids: [playerId],
                season: season
            }
        });
        if (result.status === 200) {
            return this.unwrapCollection<SeasonAverageItemDTO>(result.data);
        } else {
            throw new Error(`Cannot fetch season ${season} for player id ${playerId}`);
        }
    }
}
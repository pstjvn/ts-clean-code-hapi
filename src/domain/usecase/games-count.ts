import { Failure } from '../../core/failure';
import { IPlayerRepository } from '../repository/iplayer.repository';
import { ISeasonRepository } from '../repository/iseason.repository';
import { PlayCount } from '../entity/play-count';
import { Player } from '../entity/player';

export class GamesCountUsecase {
    private defaultSeasons = [
        '2014',
        '2015',
        '2016',
        '2017', 
        '2018', 
        '2019',
        '2020'
    ];

    constructor(private playerRepo: IPlayerRepository, private gamesRepo: ISeasonRepository) {}

    /**
     * Obtains the games played by season for a given player by his name.
     * If the player is not found (i.e. name does not match) failure with note is returned.
     */
    async getGameSpread(name: string, seasons?: string[]): Promise<PlayCount|Failure> {
        let player = await this.playerRepo.findByName(name);
        let seasonsData = await this.gamesRepo.getSeasonsAverages(player, seasons || this.defaultSeasons);
        if (seasonsData instanceof Failure) return seasonsData;
        let pc = new PlayCount();
        pc.player = player as Player;
        pc.seasons = seasonsData;
        return pc;
    }
}
import { IPlayerRepository } from '../../domain/repository/iplayer.repository';
import { Player as PlayerEntity } from '../../domain/entity/player';
import { Failure } from '../../core/failure';
import { BallDontLie } from '../datasource/balldontlie';
import * as Player from '../model/player';

export class PlayerRepository implements IPlayerRepository {
    constructor(private ballDatasource: BallDontLie) {}

    async findByName(name: string): Promise<NonNullable<PlayerEntity>|NonNullable<Failure>> {
        try {
            let data = await this.ballDatasource.findPlayerByName(name);
            let player = Player.fromPOJO(data);
            return player;
        } catch (e) {
            if ((e as Error).message === 'No response data found') {
                return new Failure('No user found matching search term');
            } else {
                return new Failure(e);
            }
        }
    }
}
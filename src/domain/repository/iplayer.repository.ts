import { Player } from '../entity/player';
import { Failure } from '../../core/failure';

export interface IPlayerRepository {
    findByName(name: string): Promise<NonNullable<Player>|NonNullable<Failure>>;
}
import { Player } from '../../domain/entity/player'
import { PlayerInfoItemDTO } from '../datasource/balldontlie';

export function fromPOJO(data: PlayerInfoItemDTO): Player {
    let p = new Player();
    p.id = data.id;
    p.firstName = data.first_name;
    p.lastName = data.last_name;
    return p;
}
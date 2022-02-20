import { Player } from "./player";
import { SeasonAverage } from "./season-average";

export class PlayCount {
    player: Player;
    seasons: SeasonAverage[] = [];
    private _aboveFifthy?: number | null;

    get count(): number {
        return this.seasons.length;
    }

    get aboveFifthyCount(): number {
        if (this._aboveFifthy === null) {
            this._aboveFifthy = this.seasons.reduce((count, item) => {
                if (item.gamesPlayed > 50) return count + 1;
                else return count;
            }, 0);
        }
        return this._aboveFifthy;
    }

    get bellowFifthyCount(): number {
        return this.count - this.aboveFifthyCount;
    }
}
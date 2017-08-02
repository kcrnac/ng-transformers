import { Vehicle } from './vehicle.model';
import { Faction } from './faction.model';
import { Status } from './status.model';

export class Transformer {
    constructor(
        public _id: string,
        public name: string,
        public vehicle: Vehicle,
        public gears: string[],
        public status: Status,
        public faction: Faction
    ) {}

}
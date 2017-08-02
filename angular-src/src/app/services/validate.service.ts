import { Injectable } from '@angular/core';

import { Transformer } from '../model/transformer.model';

@Injectable()
export class ValidateService  {

    constructor() {}

    validateTransformerUpdate(transformer: Transformer): string{
        
        if(!transformer.name)
            return "Name can not be empty.";

        if(!transformer.faction)
            return "Faction can not be empty.";

        if(!transformer.vehicle.group || !transformer.vehicle.model || !transformer.vehicle.type)
            return "Vehicle group, model and type are all required fields.";

        if(!transformer.status)
            return "Status can not be empty.";
        
    }

    validateAddGear(gears: string[], newGear): string {

        var exists = gears.find(p => p == newGear);
        
        if(exists){
            return "Gear already exists!";
            }
    }
}
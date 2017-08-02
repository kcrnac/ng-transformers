import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Transformer } from '../model/transformer.model';
import { Vehicle } from '../model/vehicle.model';
import { Status } from '../model/status.model';
import { Faction } from '../model/faction.model';

export class InMemoryDataService implements InMemoryDbService {
    
    createDb() {

/*        const vehicleGroups: string[] = [
            "Air", "Land", "Sea"
        ];

        const vehicleTypes: string[] = [
            "Plane", "Helicopter", "Boat", "Submurine" , "Car", "Truck"
        ];

        const vehicleModels: string[] = [
            "F-22", "Sukhoi", "MiG", "Apache", "Kamov", "Sailboat", "Jetboat", "Standard", "Camaro", "AMG GT R", "Lamborghini", "Unimog", "Western Star 5700"
        ];

        return  { vehicleGroups, vehicleTypes, vehicleModels};*/

        return {};
    }
}
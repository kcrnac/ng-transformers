import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Vehicle } from '../model/vehicle.model';
 
declare var _: any

@Injectable()
export class VehicleService {
    // Currently not used
    private vehicleGroupsUrl: string = "api/vehicleGroups";
    private vehicleTypesUrl: string = "api/vehicleTypes";
    private vehicleModelsUrl: string = "api/vehicleModels";

    // In use
    private vehiclesUrl: string = "http://localhost:3000/api/vehicles";


    constructor(private http: Http) {}

    // Not used
    getVehicleGroups(): Promise<string[]>{
        return this.http.get(this.vehicleGroupsUrl)
            .toPromise()
            .then(res => res.json().data as string[])
            .catch(this.handleError);
    }

    // Not used
    getVehicleTypes(): Promise<string[]> {
        return this.http.get(this.vehicleTypesUrl)
            .toPromise()
            .then(res => res.json().data as string[])
            .catch(this.handleError);
    }

    // Not used
    getVehicleModels(): Promise<string[]> {
        return this.http.get(this.vehicleModelsUrl)
            .toPromise()
            .then(res => res.json().data as string[])
            .catch(this.handleError);
    }

    // In use
    getVehicles(): Promise<Vehicle[]> {
        return this.http.get(this.vehiclesUrl)
            .toPromise()
            .then(res => { return res.json() as Vehicle[]})
            .catch(this.handleError);
    }

    filterVehicleGroups(vehicles: Vehicle[]): string[] {
        return _.map(_.groupBy(vehicles, p => { return p.group; }), p => { return p[0].group; });
    }

    filterVehicleTypes(vehicles: Vehicle[], group: string): string[] {
        return _.map(_.groupBy(_.filter(vehicles, p => { return p.group == group}), s => { return s.type; } ), p => { return p[0].type});
    }

    filterVehicleModels(vehicles: Vehicle[], type: string): string[] {
        return _.map(_.groupBy(_.filter(vehicles, p => { return p.type == type}), s => { return s.model; } ), p => { return p[0].model});
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
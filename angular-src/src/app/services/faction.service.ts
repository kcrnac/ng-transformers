import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Faction } from '../model/faction.model';
 
@Injectable()
export class FactionService {
    private factionsUrl: string = "http://localhost:3000/api/factions";
    private factionUrl: string = "http://localhost:3000/api/faction";
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getFactions(): Promise<Faction[]>{
        
        return this.http.get(this.factionsUrl, { headers: this.headers})
            .toPromise()
            .then(res => {
                return res.json() as Faction[]
            })
            .catch(this.handleError);
    }

    save(factionName): Promise<Faction> {
        return this.http.post(this.factionUrl, JSON.stringify({ name: factionName }), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Faction)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
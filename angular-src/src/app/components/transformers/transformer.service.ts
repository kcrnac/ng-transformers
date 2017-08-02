import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Transformer } from '../../model/transformer.model';
import { Vehicle } from '../../model/vehicle.model';
import { Status } from '../../model/status.model';
import { Faction } from '../../model/faction.model';
 
@Injectable()
export class TransformerService {
    private transformersUrl: string = "http://localhost:3000/api/transformers";
    private transformerUrl: string = "http://localhost:3000/api/transformer";
    private headers = new Headers({'Content-Type': 'application/json'});
    
    Status: Status;

    constructor(private http: Http) {}

    getTransformers(): Promise<Transformer[]>{
        
        return this.http.get(this.transformersUrl)
            .toPromise()
            .then(res => res.json() as Transformer[])
            .catch(this.handleError);
    }

    getTransformer(id: string): Promise<Transformer> {

        const url = this.transformerUrl + `/${id}`;

        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Transformer)
            .catch(this.handleError);
    }

    addOrUpdate(transformer: Transformer): Promise<Transformer> {
        
        const url = this.transformerUrl + `/${transformer._id}`;

        return this.http
            .put(url, JSON.stringify(transformer), {headers: this.headers})
            .toPromise()
            .then(() => transformer)
            .catch(this.handleError);

    }

    delete(transformer: Transformer): Promise<Transformer> {

        const url = this.transformerUrl + `/${transformer._id}`;

        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => transformer)
            .catch(this.handleError);
    }

    search(name: string): Promise<Transformer[]> {
        
        var url = this.transformersUrl + `/?name=${name}`;

        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Transformer[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
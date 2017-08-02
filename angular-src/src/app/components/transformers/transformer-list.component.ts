import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs/Observable';

import { TransformerService } from './transformer.service';
import { FactionService } from '../../services/faction.service';

import { Transformer } from '../../model/transformer.model';
import { Status } from '../../model/status.model';
import { Faction } from '../../model/faction.model';

@Component({
    selector: 'list',
    templateUrl: './transformer-list.component.html',
    styleUrls: ['./transformer-list.component.css']
})
export class TransformerListComponent implements OnInit {

    constructor(
        private service: TransformerService,
        private factionService: FactionService,
        private router: Router
    ) {}

    // Refs
    status = Status;

    // Vars
    transformers: Transformer[];
    transformersView: Transformer[];
    factions: Faction[];
    searchParam: string;
    factionFilter: Faction;

    ngOnInit(): void {

        this.getTransformers(null);

        this.factionService.getFactions()
            .then(factions => this.factions = factions);
    }

    getTransformers(name: string): void {

        if(name && name != ''){

            this.service.search(name)
                .then(t => this.transformers = this.transformersView = t);

        } else {

            this.service.getTransformers()
                .then(t => this.transformers = this.transformersView = t);

        }
        
    }

    // Events
    onClick(transformer: Transformer): void {
        this.router.navigate(['/transformer', transformer._id]);
    }

    onFactionChange(): void {

        if(this.factionFilter)
            this.transformersView = this.transformers.filter(p => p.faction._id == this.factionFilter._id);
        else
            this.transformersView = this.transformers;

    }

    search(): void {
        this.factionFilter = null;
        this.getTransformers(this.searchParam);
    }

    clear(): void {
        this.searchParam = '';
        this.factionFilter = null;
        this.getTransformers(null);
    }

    addNew(): void {
        this.router.navigate(['/transformer/new']);
    }
}
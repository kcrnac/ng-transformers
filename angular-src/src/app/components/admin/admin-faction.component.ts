import { Component, OnInit } from '@angular/core';

import { Faction } from '../../model/faction.model';

import { FactionService } from '../../services/faction.service';

 @Component({
     selector: 'admin-faction',
     templateUrl: 'admin-faction.component.html',
     styleUrls: ['admin-faction.component.css']
 })
export class AdminFactionComponent implements OnInit {

    constructor(private factionService: FactionService) {}

    factions: Faction[];
    factionName: string;

    ngOnInit(): void {
        this.factionService.getFactions()
            .then((res) => this.factions = res);
    }

    addFaction(): void {
    }

    deleteFaction(faction: Faction): void {

    }

}
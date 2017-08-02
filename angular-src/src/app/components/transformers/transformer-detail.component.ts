import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/switchMap';

import { Transformer } from '../../model/transformer.model';
import { Gear } from '../../model/gear.model';
import { Status } from '../../model/status.model';
import { Faction } from '../../model/faction.model';
import { Vehicle } from '../../model/vehicle.model';

import { EnumHelper} from '../../helpers/enum.helper';
import { CompareHelper } from '../../helpers/compare.helper';

import { TransformerService } from './transformer.service';
import { VehicleService } from '../../services/vehicle.service';
import { FactionService } from '../../services/faction.service';
import { ValidateService } from '../../services/validate.service';

declare var _: any

@Component({
    selector: 'transformer-detail',
    templateUrl: './transformer-detail.component.html',
    styleUrls: ['./transformer-detail.component.css']
})
export class TransformerDetailComponent implements OnInit {

    constructor(
        private transformerService: TransformerService,
        private vehicleService: VehicleService,
        private factionService: FactionService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private validateService: ValidateService,
        private flashMessage: FlashMessagesService
    ) {}

    // Refs
    Status = Status;
    CompareHelper = CompareHelper;

    // Vars
    transformer: Transformer;
    newGearName: string;
    newGearErrors: string[] = [];
    vehicleGroups: string[] = [];
    vehicleTypes: string[] = [];
    vehicleModels: string[] = [];
    statusList: string[] = [];
    factions: Faction[] = [];
    vehicles: Vehicle[] = [];

    transformerNewUrl = '/transformer/new';
    isEdit: boolean = true;

    // Init
    ngOnInit(): void {
        
        this.isEdit = this.router.url != this.transformerNewUrl

        if(this.isEdit){

            this.route.paramMap
                .switchMap((params: ParamMap) => this.transformerService.getTransformer(params.get('id')))
                .subscribe((transformer: Transformer) => {
                    this.transformer = transformer;

                    this.vehicleService.getVehicles()
                        .then(vehicles => {
                            this.vehicles = vehicles;
                            this.filterVehicles();
                        });

                });

        } else {

            this.transformer = this.getNewTransformer();
            
            this.vehicleService.getVehicles()
                .then(vehicles => {
                    this.vehicles = vehicles;
                    this.filterVehicles();
                });
        } 

        this.statusList = EnumHelper.enumToStringArray(Status);

        this.factionService.getFactions()
            .then(factions => this.factions = factions);
    }


    // Add new gear to list of gears
    addGear(): void {

        var error = this.validateService.validateAddGear(this.transformer.gears, this.newGearName)

        if(error){
            this.flashMessage.show(error, { cssClass: "alert-danger", timeout: 3000});
        } else {
            this.transformer.gears.push(this.newGearName);
            this.newGearName = '';
        }
    }

    // Delete gear from the list of gears
    deleteGear(gear: string): void {
        
        var gears = this.transformer.gears;

        this.transformer.gears = gears.filter(p => p != gear);
    }

    // Validate and update transformer
    save(): void {

        var error = this.validateService.validateTransformerUpdate(this.transformer);
        
        if(error) {
            this.flashMessage.show(error, { cssClass: "alert-danger", timeout: 3000});
        } else {

            this.transformerService.addOrUpdate(this.transformer)
                .then(() => {
                    if(this.isEdit)
                        this.flashMessage.show("Successfully saved!", { cssClass: "alert-success", timeout: 2000})
                    else
                        this.gotoTransformerList();
                })
                .catch();
        }
    }

    deleteTransformer(): void {
        this.transformerService.delete(this.transformer)
            .then(() => this.gotoTransformerList())
            .catch();
    }

    getNewTransformer(): Transformer{
        return new Transformer(null, null, new Vehicle(null, null, null), [], null, null);
    }

    filterVehicles(): void {
        this.vehicleGroups = this.vehicleService.filterVehicleGroups(this.vehicles);
        this.vehicleTypes = this.vehicleService.filterVehicleTypes(this.vehicles, this.transformer.vehicle.group);
        this.vehicleModels = this.vehicleService.filterVehicleModels(this.vehicles, this.transformer.vehicle.type);
    }

    // Events
    onVehicleGroupChange(): void {

        this.vehicleTypes = this.vehicleService.filterVehicleTypes(this.vehicles, this.transformer.vehicle.group);

        this.transformer.vehicle.type = '';
        this.transformer.vehicle.model = '';
    }

    onVehicleTypeChange(): void {
    
        this.vehicleModels = this.vehicleService.filterVehicleModels(this.vehicles, this.transformer.vehicle.type);

        this.transformer.vehicle.model = '';
    }

    gotoTransformerList(): void {
        let link = ['/transformers'];
        this.router.navigate(link);
    }

    goBack(): void {
        this.location.back();
    }

}
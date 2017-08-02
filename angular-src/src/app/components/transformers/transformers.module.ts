import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';

import { TransformerDetailComponent } from './transformer-detail.component';
import { TransformerListComponent } from './transformer-list.component';

import { TransformersRoutingModule } from './transformers-routing.module';

import { TransformerService } from './transformer.service';
import { VehicleService } from '../../services/vehicle.service';
import { FactionService } from '../../services/faction.service';
import { ValidateService } from '../../services/validate.service';

@NgModule({
    imports: [
        TransformersRoutingModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        TransformerDetailComponent,
        TransformerListComponent
    ],
    providers: [
        TransformerService,
        VehicleService,
        FactionService,
        ValidateService,
        FlashMessagesService
    ]
})
export class TransformersModule {}

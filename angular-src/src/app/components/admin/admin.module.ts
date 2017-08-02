import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminFactionComponent } from './admin-faction.component';
import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        AdminComponent,
        AdminFactionComponent,
        AdminDashboardComponent
    ],
    providers: []
})
export class AdminModule {}
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransformerListComponent } from './transformer-list.component';
import { TransformerDetailComponent } from './transformer-detail.component';

const transformersRoutes: Routes = [
    { path: 'transformers', component: TransformerListComponent },
    { path: 'transformer/:id', component: TransformerDetailComponent },
    { path: 'transformer/new', component: TransformerDetailComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(transformersRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TransformersRoutingModule {}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { TransformerListComponent } from './components/transformers/transformer-list.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { TransformerService } from './components/transformers/transformer.service';

import { AppRoutingModule } from './app-routing.model';
import { TransformersModule } from './components/transformers/transformers.module';
import { AdminModule } from './components/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    TransformersModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [TransformerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

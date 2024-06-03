import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportMapComponent } from './report-map/report-map.component';
import { ReportListComponent } from './report-list/report-list.component';
import { HttpClientModule } from '@angular/common/http'

// Import Forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportMonsterFormComponent } from './report-monster-form/report-monster-form.component';
import { MonsterListItemComponent } from './monster-list-item/monster-list-item.component';

import { RoutingModule } from './routing.module'
import { MonsterMarkersService } from './monster-markers.service';
import { MonsterEditComponent } from './monster-edit/monster-edit.component';
import { LoginResolveComponent } from './login-resolve/login-resolve.component';
import { LoginDeleteComponent } from './login-delete/login-delete.component';
import { SpacesCapitalizePipe } from './spaces-capitalize.pipe';
import { TitleCasePipe } from '@angular/common';
import { MonstersPSQLService } from './monsters-psql.service';

@NgModule({
  declarations: [
    AppComponent,
    ReportMapComponent,
    ReportListComponent,
    ReportMonsterFormComponent,
    MonsterListItemComponent,
    MonsterEditComponent,
    LoginResolveComponent,
    LoginDeleteComponent,
    SpacesCapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [MonsterMarkersService, TitleCasePipe, MonstersPSQLService],
  bootstrap: [AppComponent]
})
export class AppModule { }

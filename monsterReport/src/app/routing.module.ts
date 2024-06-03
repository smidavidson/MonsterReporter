import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportMonsterFormComponent } from './report-monster-form/report-monster-form.component';
import { ReportMapComponent } from './report-map/report-map.component';
import { MonsterEditComponent } from './monster-edit/monster-edit.component';
import { LoginResolveComponent } from './login-resolve/login-resolve.component';
import { LoginDeleteComponent } from './login-delete/login-delete.component';

const appRoutes:Routes = [
    { path: '', component: ReportMapComponent},
    { path: 'reportmonster', component: ReportMonsterFormComponent },
    { path: 'map', component: ReportMapComponent},
    { path: 'monster/:id', component: MonsterEditComponent},
    { path: 'modify/:id', component: LoginResolveComponent},
    { path: 'delete/:id', component: LoginDeleteComponent}


]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class RoutingModule { }
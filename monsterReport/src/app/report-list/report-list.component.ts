import { Component, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CollectionsItem } from '../models/collections-item';
import { MonsterModel } from '../models/monster-model';
import { MonsterMarkersService } from '../monster-markers.service';

@Component({
    selector: 'app-report-list',
    templateUrl: './report-list.component.html',
    styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {
    monsterReportList:MonsterModel[]
    
    // When Component loads, add monsters to List
    constructor(private monsterMarkersService: MonsterMarkersService) {
        this.monsterMarkersService = monsterMarkersService
        this.monsterReportList = []

        this.monsterMarkersService.getMonsters()
        .subscribe(data => {
            this.monsterReportList = data
            console.log("Got the monsters")
            console.log(data)
        })

    }

    sortLocation():void {
        console.log("Sort location running")
        console.log(this.monsterReportList)
        this.monsterReportList.sort((c1, c2) => c1.location_name.localeCompare(c2.location_name))
    }

    sortTimeReported():void {
        this.monsterReportList.sort((c1, c2) => (c1.time_reported - c2.time_reported))
    }

    sortStatus():void {
        this.monsterReportList.sort((c1, c2) => String(c1.status).localeCompare(String(c2.status)))
    }

    sortMonster():void {
        this.monsterReportList.sort((c1, c2) => c1.monster.localeCompare(c2.monster))
    }

    // When delete is triggered
    onMonsterDelete(evt:any) {
        console.log(evt)
    }


}

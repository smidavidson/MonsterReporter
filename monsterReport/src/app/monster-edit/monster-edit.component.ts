import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { CollectionsItem } from '../models/collections-item';
import { MonsterMarkersService } from '../monster-markers.service';
import { MonsterModel } from '../models/monster-model';
import { Router } from '@angular/router'

@Component({
    selector: 'app-monster-edit',
    templateUrl: './monster-edit.component.html',
    styleUrls: ['./monster-edit.component.css']
})
export class MonsterEditComponent {
    id: number
    monster:MonsterModel

    constructor(private activatedRoute: ActivatedRoute, private monsterMarkersService: MonsterMarkersService, private router: Router) {
        this.id = activatedRoute.snapshot.params['id']
        this.monsterMarkersService = monsterMarkersService
        console.log(this.id)
        this.monster = new MonsterModel(0, "FAIL", 0, "FAIL", "FAIL", 0, 0, 0, false, "", "");

        this.monsterMarkersService.getMonsters()
        .subscribe(data => {
            console.log("YO PLUG")
            console.log(data)

            for (let someMonster of data) {
                if (someMonster.id == this.id) {
                    console.log("FOUND!")
                    // this.monster.id = someMonster.data.id
                    this.monster = someMonster
                    break
                }
            }
        })

    }

    onChange() {
        console.log("OnChange received")
        this.router.navigate(['/modify',this.monster.id])
    }

}

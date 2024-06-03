import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { MonsterModel } from '../models/monster-model';
import { CollectionsItem } from '../models/collections-item';

@Component({
    // Allows item to be displayed in table row
    selector: 'tr[app-monster-list-item]',
    templateUrl: './monster-list-item.component.html',
    styleUrls: ['./monster-list-item.component.css']
})
export class MonsterListItemComponent {
    @Input() monster!:MonsterModel
    @Output() delete = new EventEmitter()

    constructor(private router: Router) {

    }

    onMoreInfo() {
        console.log("onEdit() received")
        console.log(this.monster)
        this.router.navigate(['/monster',this.monster.id])
        // this.router.navigate(['/reportmonster'])
    }

    onDelete() {
        console.log("onDelete() received")
        console.log(this.monster)
        this.router.navigate(['/delete',this.monster.id])
    }

}

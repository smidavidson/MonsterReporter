import { Injectable } from '@angular/core';
import { MonsterModel } from './models/monster-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationModel } from './models/location-model';

@Injectable({
    providedIn: 'root'
})
export class MonstersPSQLService {
    monsters:any[] = [];

    constructor(private http:HttpClient) {
        
    }

    getMonsters():Observable<MonsterModel []>  {
        return this.http.get<any []>('http://localhost:3000/monsters-api/all')
    }

    // We want adding to have no id attribute (since psql will add one for us)
    add(newMonster:MonsterModel) {
        console.log("Adding new monster")
        return this.http.post<MonsterModel>('http://localhost:3000/monsters-api/add', newMonster)
    }

    deleteMonster(id:number) {
        console.log("monsters-psql.service.ts deleteMonster()")
        // console.log('localhost:3000/monsters-api/delete/' + id)
        return this.http.delete('http://localhost:3000/monsters-api/delete/' + id);
    }

    getLocations():Observable<LocationModel []> {
        return this.http.get<any []>('http://localhost:3000/monsters-api/locations/all')
    }

    addLocation(newLocation:any) {
        return this.http.post('http://localhost:3000/monsters-api/locations/add', newLocation)
    }


}

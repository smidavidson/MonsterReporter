import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CollectionsItem } from './models/collections-item';
import * as L from 'leaflet'
import { Observable } from 'rxjs';
import { MonsterModel } from './models/monster-model';
import { LocationModel } from './models/location-model';
import { TitleCasePipe } from '@angular/common';
import { MonstersPSQLService } from './monsters-psql.service';


// Service used by report-map component to place monster markers after map loads
@Injectable({
    providedIn: 'root'
})
export class MonsterMarkersService {
    httpClient: HttpClient
    monsterPSQLService: MonstersPSQLService

    constructor(httpClient: HttpClient, private titleCasePipe: TitleCasePipe, private monsterPSQL: MonstersPSQLService) { 
        this.httpClient = httpClient
        this.monsterPSQLService = monsterPSQL
    }

    placeMonsterMarkers(map: L.Map): void {
        this.monsterPSQLService.getMonsters().subscribe(data => {


            let monsterReportList:any[] = data



            console.log(monsterReportList);
            // console.log(monsterReportList[0].location_name)

            let locations:string[] = []
            let coord_x:number[] = []
            let coord_y:number[] = []
            
            // Sort locations by name
            monsterReportList.sort((c1, c2) => c1.location_name.localeCompare(c2.location_name))

            console.log(monsterReportList);

            for (let m of monsterReportList) {
                if (!locations.includes(m.location_name)) {
                    locations.push(m.location_name)
                    coord_x.push(m.coord_x)
                    coord_y.push(m.coord_y)
                }
            }
            // console.log(locations);

            let locationCounts:number[] = new Array<number>(locations.length).fill(0)
            let lastLocation:string = ""
            let index:number = 0
            // console.log(locationCounts)
            for (let m = 0; m < monsterReportList.length; m++) {
                if (m == 0) {
                    lastLocation = monsterReportList[m].location_name
                    let count = locationCounts[index]
                    locationCounts[index] = count + 1;
                } else {
                    if (monsterReportList[m].location_name == lastLocation) {
                        let count = locationCounts[index]
                        locationCounts[index] = count + 1;
                    } else {
                        lastLocation = monsterReportList[m].location_name
                        index++;
                        let count = locationCounts[index]
                        locationCounts[index] = count + 1;
                    }
                }
            }
            console.log(locationCounts)

            for (let i = 0; i < locations.length; i++) {
                let coordx:number = coord_x[i]
                let coordy:number = coord_y[i]
                // console.log("Adding to map")
                // console.log(coord_x[i])
                // console.log(coord_y[i])
                let mk = L.marker([coordx, coordy]).addTo(map);
                let capitalizedString:string = locations[i][0].toUpperCase() + locations[i].slice(1)
                capitalizedString = capitalizedString.replaceAll('_', ' ')
                capitalizedString = this.titleCasePipe.transform(capitalizedString)
                mk.bindPopup("<b>" + capitalizedString + "</b><br/>" + locationCounts[i] + " monster reported").openPopup();
            }

        })
        


        // this.httpClient.get<CollectionsItem[]>('https://272.selfip.net/apps/CsieaHP9dx/collections/testm_collection/documents/')
        // .subscribe(data => {
        //     let monsterReportList:CollectionsItem[] = data
        //     let locations:string[] = []
        //     let coord_x:number[] = []
        //     let coord_y:number[] = []

        //     monsterReportList.sort((c1, c2) => c1.data.location_name.localeCompare(c2.data.location_name))

        //     for (let m of monsterReportList) {
        //         if (!locations.includes(m.data.location_name)) {
        //             locations.push(m.data.location_name)
        //             coord_x.push(m.data.coord_x)
        //             coord_y.push(m.data.coord_y)
        //         }
        //     }

        //     let locationCounts:number[] = new Array<number>(locations.length).fill(0)
        //     let lastLocation:string = ""
        //     let index:number = 0
        //     // console.log(locationCounts)
        //     for (let m = 0; m < monsterReportList.length; m++) {
        //         if (m == 0) {
        //             lastLocation = monsterReportList[m].data.location_name
        //             let count = locationCounts[index]
        //             locationCounts[index] = count + 1;
        //         } else {
        //             if (monsterReportList[m].data.location_name == lastLocation) {
        //                 let count = locationCounts[index]
        //                 locationCounts[index] = count + 1;
        //             } else {
        //                 lastLocation = monsterReportList[m].data.location_name
        //                 index++;
        //                 let count = locationCounts[index]
        //                 locationCounts[index] = count + 1;
        //             }
        //         }
        //     }
        //     // console.log(locationCounts)

        //     for (let i = 0; i < locations.length; i++) {
        //         let coordx:number = coord_x[i]
        //         let coordy:number = coord_y[i]
        //         // console.log("Adding to map")
        //         // console.log(coord_x[i])
        //         // console.log(coord_y[i])
        //         let mk = L.marker([coordx, coordy]).addTo(map);
        //         let capitalizedString:string = locations[i][0].toUpperCase() + locations[i].slice(1)
        //         capitalizedString = capitalizedString.replaceAll('_', ' ')
        //         capitalizedString = this.titleCasePipe.transform(capitalizedString)
        //         mk.bindPopup("<b>" + capitalizedString + "</b><br/>" + locationCounts[i] + " cases reported").openPopup();
        //     }

        // })
    }

    getMonsters(): Observable<MonsterModel[]> {
        // return this.httpClient.get<CollectionsItem[]>('https://272.selfip.net/apps/CsieaHP9dx/collections/testm_collection/documents/')
        return this.monsterPSQLService.getMonsters()
    }

    getLocations(): Observable<LocationModel[]> {
        // return this.httpClient.get<LocationModel[]>("https://272.selfip.net/apps/CsieaHP9dx/collections/locations/documents/")
        return this.monsterPSQLService.getLocations()
    }

    addLocation(coord_x:number, coord_y:number, location_name: string): void {

        this.monsterPSQLService.getLocations().subscribe( data => {
            let isDuplicate:boolean = false
            
            let newLocationName:string = location_name.toLocaleLowerCase();
            for (let loc of data) {
                if (loc.location_name == newLocationName) {
                    console.log("Duplicate location found")
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                console.log("No duplicate location found, adding new location to db")
                this.monsterPSQLService.addLocation({
                    'coord_x': coord_x, 
                    'coord_y': coord_y, 
                    'location_name': location_name
                }).subscribe( response => {
                    console.log(response)
                })

                // this.httpClient.post('https://272.selfip.net/apps/CsieaHP9dx/collections/locations/documents/', {
                //     'key': key,
                //     'data': {'coord_x': coord_x, 'coord_y': coord_y}
                // }).subscribe(
                //     (data:any)=>{
                //         // console.log(data)
                //     }
                // )
            }


        })


        // this.httpClient.get<LocationModel[]>("https://272.selfip.net/apps/CsieaHP9dx/collections/locations/documents/").subscribe( data => {
        //     let isDuplicate:boolean = false
        //     for (let loc of data) {
        //         if (loc.id == id {
        //             console.log("duplicate found")
        //             isDuplicate = true;
        //             break;
        //         }
        //     }
        //     if (!isDuplicate) {
        //         console.log("no duplicates adding to collection")
        //         this.httpClient.post('https://272.selfip.net/apps/CsieaHP9dx/collections/locations/documents/', {
        //             'key': key,
        //             'data': {'coord_x': coord_x, 'coord_y': coord_y}
        //         }).subscribe(
        //             (data:any)=>{
        //                 // console.log(data)
        //             }
        //         )
        //     }

        // })

    }

    addMonster(newMonster:any): void {
        console.log("monster-marker.service.ts - addMonster()")
        // console.log(date)
        console.log(newMonster)
        
        this.monsterPSQLService.add(newMonster).subscribe(response => {
            console.log(response)
        })

        // this.httpClient.post('https://272.selfip.net/apps/CsieaHP9dx/collections/testm_collection/documents/', {
        //     'key': date.toString(),
        //     'data': newMonster
        // }).subscribe(
        //     (data:any)=>{
        //         // console.log(data)
        //     }
        // )
    }



    checkPassword(password:string): Observable<{Digest:string}> {
        console.log('checkPassword ran')
        return this.httpClient.get<{Digest:string}>('https://api.hashify.net/hash/md5/hex?value=' + password)
    }



    resolveMonster(id:number): void {
        console.log("monster-markers.service.ts - resolveMonster()")

        let monster:MonsterModel
        this.getMonsters().subscribe(data => {
            for (let someMonster of data) {
                if (someMonster.id == id) {
                    monster = someMonster;
                    monster.status = false;

                    this.monsterPSQLService.deleteMonster(id).subscribe( () => {
                        
                    })

                    console.log(monster)
                    this.addMonster(monster);

                    break;

                }
            }
        })

        // let monster:CollectionsItem
        // this.getMonsters().subscribe(data => {
        //     for (let someMonster of data) {
        //         if (someMonster.id == id) {
        //             monster = someMonster;
        //             monster.data.status = false
                    
        //             this.httpClient.delete('https://272.selfip.net/apps/CsieaHP9dx/collections/testm_collection/documents/' + key + "/")
        //             .subscribe(() => {
        //                 this.addMonster(Number(key), monster.data)
        //             })
        //             break;
        //         }
        //     }
        // })

    }

    // You must subscribe for the call to execute
    deleteMonster(id:number): void {
        console.log("monster-markers.service.ts - deleteMonster()")
        console.log(id)

        this.monsterPSQLService.deleteMonster(id).subscribe( response => {
            console.log("Monster Deleted!")
        })
        // this.httpClient.delete('https://272.selfip.net/apps/CsieaHP9dx/collections/testm_collection/documents/' + key + "/")
        // .subscribe(
        //     () =>  {
        //         // console.log("Monster deleted!")
        //     }
        // )
    }




}

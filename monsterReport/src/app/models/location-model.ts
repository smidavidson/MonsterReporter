export class LocationModel {
    id: number;
    coord_x: number;
    coord_y: number;
    location_name: string;


    constructor(id: number, coord_x:number, coord_y:number, location_name: string) {
        this.id = id;
        this.coord_x = coord_x;
        this.coord_y = coord_y;
        this.location_name = location_name;
    }

}

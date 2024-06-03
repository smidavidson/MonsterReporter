export class MonsterModel {
    id: number;
    witness: string;
    phone_num: number;
    monster: string;
    location_name: string;
    time_reported: number;
    coord_x: number;
    coord_y: number;
    status: boolean;
    picture: string;
    addInfo: string;

    public constructor(id: number, witness:string, phone_num: number, monster: string, location_name: string, 
        time_reported: number, coord_x: number, coord_y: number, status:boolean,
        picture: string, addInfo: string) {
        this.id = id;
        this.witness = witness;
        this.phone_num = phone_num;
        this.monster = monster;
        this.location_name = location_name;
        this.time_reported = time_reported;
        this.coord_x = coord_x;
        this.coord_y = coord_y;
        this.status = status;
        this.picture = picture;
        this.addInfo = addInfo;
    }
}

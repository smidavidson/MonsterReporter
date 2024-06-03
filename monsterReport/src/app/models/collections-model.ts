import { MonsterModel } from "./monster-model";

export class CollectionsModel {
    key: number;
    data: string;

    constructor(data:any) {
        this.key = data.key;
        this.data = data.data
    }


}

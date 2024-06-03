import { MonsterModel } from "./monster-model";

export class CollectionsItem {
    key:string;
    data:MonsterModel

    constructor(key:string, data:MonsterModel) {
        this.key = key;
        this.data = data;
    }
}

import { Categorie } from "../rayon";

export class Promotion {
    id: string;
    superMarketId: string;
    name: string;
    startDate: Date;
    endDate: Date;
    reduction: number;
    categories: Categorie[];
    imageUrl: string;

    constructor(){}
}

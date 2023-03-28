import { ProductType } from "../restaurant/produit/typeProduct";

export class Promotion{

    id: string;
    restaurantId: string;
    name: string;
    startDate: Date;
    endDate: Date;
    reduction: number;
    productTypes: ProductType[];
    categories: number[];
    imageUrl: string;

    constructor(){}
}
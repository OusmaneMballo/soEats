import { ProductType } from "./typeProduct";

export class Produit{
    id: string;
    cardId: string;
    name: string;
    price: number;
    description: string;
    categorie: number;
    imageUrl: string;
    productType: ProductType;

    constructor(){};
}
import { Produit } from "../restaurant/produit/produit";

export class Menu {
      id: string;
      cardId: string;
      name: string;
      imageUrl: string;
      price: number;
      products: Produit[];

      constructor(){};
}


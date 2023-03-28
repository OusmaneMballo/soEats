import { Produit } from "./product";

export class Menu {
      id: string;
      cardId: string;
      name: string;
      imageUrl: string;
      price: number;
      products: Produit[];

      constructor(){};
}
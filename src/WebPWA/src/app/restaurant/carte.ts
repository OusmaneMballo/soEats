import { Menu } from "../menu/menu";
import { Produit } from "./produit/produit";

export class Carte{
    id: string;
    name: string;
    products: Produit[];
    menus: Menu[];

    constructor(){}
}
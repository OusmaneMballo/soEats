import { Menu } from "../menu/menu";
import { Produit } from "../restaurant/produit/produit";
import { OrderProductItems, OrderMenuItems } from "./order";

export class Panier{
    
    menus: Menu[];
    orderMenuItem:OrderMenuItems[];
    orderItem: OrderProductItems[];
    products: Produit[];
    montant: number;

    constructor(){}
}
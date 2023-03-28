import { Menu } from "./menu";
import { Produit } from "./product";
import { OrderProductItems, OrderMenuItems } from "./order";

export class Bag{
    
    menus: Menu[];
    orderMenuItem:OrderMenuItems[];
    orderItem: OrderProductItems[];
    products: Produit[];
    montant: number;

    constructor(){}
}
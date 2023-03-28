import { Menu } from "../menu/menu";
import { Produit } from "../restaurant/produit/produit";

export class Order{

    Id: string;
    RestaurantId: string;
    CustomerFirstname: string;
    CustomerLastname: string;
    CustomerEmail: string;
    CustomerAdress: string;
    CustomerPhoneNumber: string;
    OrderDate: any;
    OrderTime:string;
    Amount: number;
    OrderStatus: number;
    Status: number;
    DeliveryZone: String;
    DeliveryPrice: number;
    OrderDeliveryMethod: number;
    orderProductItems: OrderProductItems[];
    orderMenuItems: OrderMenuItems[];
    constructor(){}
}

export class OrderProductItems{
    Quantity: number;
    Product: Produit;

    constructor(){}
}

export class OrderMenuItems{
    Quantity: number;
    Menu: Menu;

    constructor(){}
}
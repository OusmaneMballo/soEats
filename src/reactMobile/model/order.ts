import { Menu } from "./menu";
import { Produit } from "./product";

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
    Remark: string;
    DeliveryZone: String;
    DeliveryPrice: number;
    OrderDeliveryMethod: number;
    orderProductItems: OrderProductItems[];
    orderMenuItems: OrderMenuItems[];
    constructor(){}
}

export class OrderProductItems{
    id: number;
    Quantity: number;
    Product: Produit;

    constructor(){}
}

export class OrderMenuItems{
    id: number;
    Quantity: number;
    Menu: Menu;

    constructor(){}
}
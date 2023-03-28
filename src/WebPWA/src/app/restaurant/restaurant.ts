
import { Image } from "../shared/image";

export class Restaurant {
    id: string;
    slugId: string;
    ownerId: string;
    normalizedName: string;
    name: string;
    address: string;
    phoneNumber: string;
    description: string;
    email: string;
    imageUrl: string;
    menuImagesUrls: string[];
    openingHours: any[];
    photosUrls: Image[];
    pourcentage: number;
    typeDeliveryMethod: number;
    restaurantCategories: RestaurantCategorie[];


    constructor(){}
}

export class RestaurantCategorie {
    id: string;
    displayName: string;
    value: string;
    imageUrl: string;

    constructor(){}
}

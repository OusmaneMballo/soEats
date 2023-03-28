import { Image } from "../shared/image";
export class Supermarche {
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
    openingHours: any[];
    photosUrls: Image[];
    pourcentage: number;
    typeDeliveryMethod: number;
    
    constructor(){}
}

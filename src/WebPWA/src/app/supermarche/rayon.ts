export class Rayon {
    id: string;
    superMarketId: string;
    displayName: string;
    value: string;
    imageUrl: string;
    categories: Categorie[];
    constructor(){}
}

export class Categorie {
    id: string;
    displayName: string;
    value: string;
    
    constructor(){}
}


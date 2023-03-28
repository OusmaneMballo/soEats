import { Restaurant } from "../restaurant/restaurant";

export class Reservation{
    id: string;
    restaurantId: any;
    reservatorEmail: string;
    ReasonToCancel : string;
    reservatorPhoneNumber: string;
    reservatorFirstname: string;
    reservatorLastname: string;
    reservationDate: any;
    reservationTime: string;
    numberOfPlaces: number;
    reservationStatus: number;
}
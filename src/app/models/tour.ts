import { Place } from "./place";

export class Tour{

    id?: number;
    name?: string;
    description?: string;
    cost?: number;
    disponibility?: number;
    duration?: string;
    image?: string;
    place?: Place;

    constructor(name: string, description: string, cost: number,disponibility: number,duration: string, image: string
        ,place: Place){

            this.name = name;
            this.description= description;
            this.cost= cost;
            this.disponibility= disponibility;
            this.duration= duration;
            this.image= image;
            this.place= place;

    }
}
import { Tour } from "./tour";
import {NewUser} from './new-user'

export class Reserve{
    id?: number;
    iva?: number;
    mail?: string;
    name?: string;
    persons?: number;
    total?: number;
    tourName?: string;
    tour?: Tour;
    usuario?: NewUser;
    
    constructor(
        iva: number,
        mail: string,
        name: string,
        persons: number,
        total: number,
        tourName: string,
        tour: Tour,
        usuario: NewUser ){

           
            this.iva= iva;
            this.mail= mail;
            this.name= name;
            this.persons= persons;
            this.total= total;
            this.tourName= tourName;
            this.tour= tour;
            this.usuario= usuario;

    }
}
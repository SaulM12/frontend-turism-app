export class Place {
    id?: number;
    name?: string;
    description?: string;
    ubication?: string;
    image1?: string;
    image2?: string;
    image3?: string;

    constructor(name: string, description: string, ubication: string,image1: string,image2: string, image3: string){
        this.name= name;
        this.description= description;
        this.ubication= ubication;
        this.image1= image1;
        this.image2= image2;
        this.image3= image3
    }

}


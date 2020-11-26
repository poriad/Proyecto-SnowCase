export class CarRental {
    id?: number;
    price: number;
    name: string;
    phone: string;
    email: string;
    location: string;
    urlImage: string;
    activated: number;

    constructor(id: number, price: number, name: string, phone: string,email: string, location: string, urlImagen: string, activated: number){
        this.id = id;
        this.price = price;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.location = location;
        this.urlImage = urlImagen;
        this.activated = activated;
    }
}

export class Casas {
  id:number;
  country:string;
  city:string;
  streetAddress:string;
  price:number;
  rating:number;
  photoUrl:string;
  capacity: number;

  constructor(){
    this.id=0;
    this.country='';
    this.city='';
    this.photoUrl='';
    this.price=0;
    this.streetAddress='';
    this.rating=0;
    this.capacity = 0;
  }
}

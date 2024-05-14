export class keepers {
  id: number;
  name: string;
  country: string;
  city: string;
  streetAddress: string;
  description: string;
  photoUrl: string;
  rating: number;


  constructor() {
    this.id = 0;
    this.name = '';
    this.country = '';
    this.city='';
    this.streetAddress = '';
    this.description = '';
    this.photoUrl = '';
    this.rating = 0;
  }
}

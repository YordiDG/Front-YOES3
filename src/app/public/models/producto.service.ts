export class Producto {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: String;
  disponibilidad: string;
  cantidad_stock: number;
  valoracion: string;
  mostrarDetalle: boolean;


  constructor() {
    this.id = 0;
    this.name = '';
    this.price = 0;
    this.image='';
    this.description='';
    this.category = '';
    this.description = '';
    this.disponibilidad = '';
    this.cantidad_stock = 0;
    this.valoracion = '';
    this.mostrarDetalle = true;
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductoService} from "../../../services/producto.service";
import {Producto} from "../../../models/producto.service";
import {MatSnackBar} from "@angular/material/snack-bar";


interface Carrito {
  id: number;
  cantidad: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-find-house',
  templateUrl: './find-house.component.html',
  styleUrls: ['./find-house.component.css']
})
export class FindHouseComponent implements OnInit{
  Productos:Producto[]=[];
  name:string;
  price:number;
  description:string;
  category: String
  disponibilidad:string;
  cantidad_stock: number;
  valoracion: string;

  contador: number = 0;
  carrito: Carrito[] = [];
  productoSeleccionado: any;

  totalCarrito: number = 0;
  mostrarMensaje: boolean = false;

  mostrarFormularioCarrito: boolean = false;

  indiceSeleccionado: number | null = null;

  productosAgregados: any[] = [];
  sinProductosAgregados: boolean = true;

  constructor(private router: Router,private productoService: ProductoService, private snackBar: MatSnackBar) {
    this.name = '';
    this.price = 0;
    this.description = '';
    this.category = '';
    this.disponibilidad = '';
    this.cantidad_stock = 0;
    this.valoracion = '';
  }

  ngOnInit() {
    this.productoService.getAll().subscribe(
      (response: any) => {
        this.Productos = response;
        this.Productos.forEach(producto => producto.mostrarDetalle = true);
      }
    );
  }

  getEstiloProducto() {
    if (this.disponibilidad == 'agotado') {
      return { backgroundColor: 'red', color: 'white' };
    } else {
      return { backgroundColor: 'green', color: 'black' };
    }
  }

  incrementarContador() {
    this.contador++;
    this.snackBar.open('Producto añadido', 'Cerrar', {
      duration: 2000,
    });
  }


  agregarAlCarrito(producto: Producto) {
    const productoEnCarrito = this.carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
      if (productoEnCarrito.cantidad < 5) {
        productoEnCarrito.cantidad++;
        this.totalCarrito += producto.price;
        this.incrementarContador();
      } else {
        this.mostrarMensaje
      }
    } else {
      if ((this.totalCarrito + producto.price) <= 700) {
        this.carrito.push({...producto, cantidad: 1});
        this.totalCarrito += producto.price;
        this.incrementarContador();
      } else {
        this.mostrarMensaje
      }
    }
  }



  verDetalle(producto: any) {
    this.productoSeleccionado = producto;
  }

  productosComprados() {
    if(this.contador == 0){
      alert("No hay ningun producto añadido en el carrito");

    }else{
      const producto: Producto[] = [];
      this.abrirCerrarFormularioCarrito();
    }
  }


  abrirCerrarFormularioCarrito() {
    this.mostrarFormularioCarrito = !this.mostrarFormularioCarrito;
  }

  cerrarFormularioCarrito() {
    this.mostrarFormularioCarrito = false;
  }

  abrirFormularioCarrito() {
    this.mostrarFormularioCarrito = true;
  }
  removerDelCarrito(index: number) {
    const producto = this.carrito[index];
    this.totalCarrito -= producto.price * producto.cantidad;
    this.carrito.splice(index, 1);

    // Verificar si el carrito está vacío
    if (this.carrito.length === 0) {
      this.contador = 0; // Reiniciar el contador
    }
  }


  cerrarMensaje() {
    this.mostrarMensaje = false;
  }

  cerrarDetalle() {
    this.productoSeleccionado = null;
    this.mostrarFormularioCarrito = false;
  }

  onFilter(){
    var filteredHouses = [...this.Productos];
    if (this.name) {
      filteredHouses = filteredHouses.filter(house => house.name.toLowerCase().includes(this.name.toLowerCase()));
    }

    this.Productos = filteredHouses;
  }
  toReset(){
    this.name = '';
    this.productoService.getAll().subscribe((response: any) => {
      this.Productos = response;
    });
  }

  goToKeeper(){
    this.router.navigateByUrl('/home-client');
  }
  goToMessenger(){
    this.router.navigateByUrl('/messenger-client');
  }
  goToProfile(){
    this.router.navigateByUrl('/profile-client');
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }
}

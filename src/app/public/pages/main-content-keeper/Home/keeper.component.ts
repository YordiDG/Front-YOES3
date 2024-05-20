import {Component, HostListener, OnInit} from '@angular/core';
import {Router, Routes} from "@angular/router";
import { ProductoService } from "../../../services/producto.service";
import { LoginService } from "../../../services/login.service";
import {Producto} from "../../../models/producto.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogLogComponent} from "../../../dialog-log/dialog-log.component";

interface Carrito {
  id: number;
  cantidad: number;
  name: string;
  price: number;
  image: string;
  total : number;
}



@Component({
  selector: 'app-keeper',
  templateUrl: './keeper.component.html',
  styleUrls: ['./keeper.component.css']
})
export class KeeperComponent implements OnInit {
  Productos: Producto[] = [];
  Categorias: any[] = [];
  name: string;
  price: number;
  description: string;
  category: string;
  disponibilidad: string;
  cantidad_stock: number;
  valoracion: string;
  contador: number = 0;
  carrito: Carrito[] = [];
  productoSeleccionado: any;
  totalCarrito: number = 0;
  mostrarMensaje: boolean = false;
  mostrarFormularioCarrito: boolean = false;
  searching: boolean = false;
  productosFiltrados: Producto[] = [];
  categoriaSeleccionada: string = '';
  cantidadProductosAnadidos: number = 0;

  showDialog: boolean = false;
  isMenuOpen: boolean = false;
  producto: boolean = false;

  mostrarMensajeBusqueda: boolean = true;

  currentSlide: number = 0;

  slides = [
    { title: 'Verduras', description: 'Brócoli, rabanito, zanahoria', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239447880758988880/138792896_dcaaded0-20e7-4f47-adb5-91c1d5e35705-removebg-preview.png?ex=6642f54a&is=6641a3ca&hm=74c606fcf9d9c96e7d1f8de35f1f9e557e8001c3f8d30d0fda7bba51897821cb&=&format=webp&quality=lossless&width=388&height=388', category: 'verduras' },
    { title: 'Carnes', description: 'Cerdo, pescado, pollo,res', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056622769410049/93505921_Meat_in_its_raw_state_-16-removebg-preview.png?ex=664188e7&is=66403767&hm=1c31fb515a2336e812980268dc8d1ff4c2956ebf8e34e40a98e88ba777f401d0&=&format=webp&quality=lossless&width=388&height=388', category: 'carnes' },
    { title: 'Frutas', description: 'Uva, plátano, manzana', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056623167606875/81678404_Mix_fruits_-7-removebg-preview.png?ex=664188e7&is=66403767&hm=fe96f65c6bbf272ccb620fd521bc4cf912ca79c78cc647fcc641be48ebc6e36f&=&format=webp&quality=lossless&width=388&height=388', category: 'frutas'},
    { title: 'Abarrotes', description: 'Arroz, azúcar, aceite', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056621808648293/pixelcut-export-removebg-preview.png?ex=664188e7&is=66403767&hm=fa52f33e1b0d55e0aa9c5de336734788cd43770bebc787c31aebac0a2d54d430&=&format=webp&quality=lossless&width=358&height=358', category: 'abarrotes' },
    { title: 'Lácteos', description: 'Queso, yogurt,leche', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056623616659476/productos-lacteos-mesa-madera.png?ex=6642da67&is=664188e7&hm=889c2418eaf1f2ec1a1df9d9ff8e764273cc026e7ecfc4fd490fa42486e7783a&=&format=webp&quality=lossless&width=306&height=311', category: 'lacteos'},
    { title: 'Panisteria', description: 'Pan, queques, tortas', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056622496645130/91630062_Delicious_uzbek_pastries_-11-removebg-preview.png?ex=6642da67&is=664188e7&hm=a1e1aa86febd160627e57ab6dc27b1111f07b06c9537cb825e81bee247fab56c&=&format=webp&quality=lossless&width=388&height=388', category: 'panisteria' },
    { title: 'Comidas', description: 'Arroz con pollo, Aji de gallina,...', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239451426606809119/ceviche-peruano-removebg-preview.png?ex=6642f897&is=6641a717&hm=56da533ca832eaa06a33453f7761100c2de3388360fc5c35230b22ca920a080f&=&format=webp&quality=lossless&width=419&height=326', category: 'comida' },
  ];


  constructor(private router: Router, private loginService: LoginService,private productoService: ProductoService, private dialog: MatDialog,private snackBar: MatSnackBar) {
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
    this.obtenerProductos();
    this.obtenerCategorias();

  }

  isDisponible(producto: Producto): boolean {
    return producto.cantidad_stock > 0;
  }
  /*Productos de carrucel*/

  nextSlide() {
    if (this.currentSlide < this.slides.length - 4) {
      this.currentSlide += 1;
    } else {
      this.currentSlide = 0;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide -= 1;
    } else {
      this.currentSlide = this.slides.length - 4;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  get visibleSlides() {
    return this.slides.slice(this.currentSlide, this.currentSlide + 4);
  }


  /**/

  showUserDialog(): void {
    this.showDialog = true;
  }

  hideUserDialog(): void {
    this.showDialog = false;
  }

  selectOption(option: string): void {
    console.log('Seleccionaste:', option);
    this.hideUserDialog();
  }

  /*----------------*/

  obtenerProductos() {
    this.productoService.getAll().subscribe(
      (response: any) => {
        this.Productos = response;
        this.Productos.forEach(producto => producto.mostrarDetalle = true);
      }
    );
  }

  obtenerCategorias() {
    this.productoService.getCategory().subscribe(
      (response: any[]) => {
        this.Categorias = response;
      },
      error => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  /*-----------*/
  mostrarMensajes(mensaje: string){

  }

  agregarAlCarrito(producto: Producto) {
    const productoEnCarrito = this.carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
      if (productoEnCarrito.cantidad < producto.cantidad_stock) {
        productoEnCarrito.cantidad++;
        productoEnCarrito.total += producto.price;
        this.totalCarrito += producto.price;
        this.loginService.actualizarTotal(this.totalCarrito);  // Actualiza el total en el servicio
        this.incrementarContador();
      } else {
        this.mostrarMensajes('La cantidad en stock de este producto se ha agotado');
      }
    } else {
      if ((this.totalCarrito + producto.price) <= 700) {
        if (producto.cantidad_stock > 0) {
          this.carrito.push({...producto, cantidad: 1, total: producto.price});
          this.totalCarrito += producto.price;
          this.loginService.actualizarTotal(this.totalCarrito);  // Actualiza el total en el servicio
          this.incrementarContador();
        } else {
          this.mostrarMensajes('Este producto está agotado');
        }
      } else {
        this.mostrarMensajes('El total del carrito excede el límite de $700');
      }
    }
  }

  incrementarContador() {
    this.contador++;
    this.snackBar.open('Producto añadido', 'Cerrar', {
      duration: 2000,
    });
  }

  cantidadAnadida(productId: number): number {
    return this.carrito.filter(item => item.id === productId).reduce((total, item) => total + item.cantidad, 0);
  }

  verDetalle(producto: any) {
    this.productoSeleccionado = producto;
  }

  productosComprados() {
    if (this.contador === 0) {
      alert("No hay ningun producto añadido en el carrito");
    } else {
      this.abrirCerrarFormularioCarrito();
    }
  }


  onFilter() {
    this.searching = true; // Marca que la búsqueda está en curso
    var filteredHouses = [...this.Productos];
    if (this.name) {
      filteredHouses = filteredHouses.filter(house => house.name.toLowerCase().includes(this.name.toLowerCase()));
    }
    this.Productos = filteredHouses;
    this.searching = false;
  }

  toReset() {
    if (this.Productos.length === 0) {
      location.reload();
    } else {

      this.name = '';
      this.onFilter();
    }
  }

  abrirCerrarFormularioCarrito() {
    this.mostrarFormularioCarrito = !this.mostrarFormularioCarrito;
  }

  cerrarFormularioCarrito() {
    this.mostrarFormularioCarrito = false;
  }

  cerrarFormulario(): void {

    this.hideUserDialog();
  }

  removerDelCarrito(index: number) {
    const producto = this.carrito[index];
    this.totalCarrito -= producto.price * producto.cantidad;
    this.carrito.splice(index, 1);

    if (this.carrito.length === 0) {
      this.contador = 0;
    }
  }

  cerrarMensaje() {
    this.mostrarMensaje = false;
  }

  cerrarDetalle() {
    this.productoSeleccionado = null;
    this.mostrarFormularioCarrito = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected readonly Producto = Producto;

  goToMessenger(){
    this.router.navigateByUrl('/messenger-client');
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }


}

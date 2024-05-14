import {Component, OnInit} from '@angular/core';
import {ProductoService} from "../../../services/producto.service";
import {Producto} from "../../../models/producto.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogLogComponent} from "../../../dialog-log/dialog-log.component";


interface Carrito {
  id: number;
  cantidad: number;
  name: string;
  price: number;
  image: String;
  total : number;
}
@Component({
  selector: 'app-abarrotes',
  templateUrl: './abarrotes.component.html',
  styleUrls: ['./abarrotes.component.css']
})
export class AbarrotesComponent implements OnInit {
  Productos: Producto[] = [];
  Categorias: any[] = [];
  name: string;
  price: number;
  description: string;
  category: String;
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
  showDialog: boolean = false;
  isMenuOpen: boolean = false;
  producto: boolean = false;

  currentSlide = 0;

  slides = [
    { title: 'Verduras', description: 'Brócoli, rabanito, limón, zanahoria, cebolla', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239064832632815709/ver.webp?ex=6641908c&is=66403f0c&hm=8c18dc8b261a05da3584d8d5887244eb9bd17bb4991573e6323b69fe2ab04d20&=&format=webp&width=584&height=388' },
    { title: 'Carnes', description: 'Cerdo, pescado, pollo, pato, res', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056622769410049/93505921_Meat_in_its_raw_state_-16-removebg-preview.png?ex=664188e7&is=66403767&hm=1c31fb515a2336e812980268dc8d1ff4c2956ebf8e34e40a98e88ba777f401d0&=&format=webp&quality=lossless&width=388&height=388' },
    { title: 'Frutas', description: 'Uva, plátano, manzana, naranja, chirimoya', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056623167606875/81678404_Mix_fruits_-7-removebg-preview.png?ex=664188e7&is=66403767&hm=fe96f65c6bbf272ccb620fd521bc4cf912ca79c78cc647fcc641be48ebc6e36f&=&format=webp&quality=lossless&width=388&height=388' },
    { title: 'Abarrotes', description: 'Arroz, azúcar, aceite, atún, leche', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056621808648293/pixelcut-export-removebg-preview.png?ex=664188e7&is=66403767&hm=fa52f33e1b0d55e0aa9c5de336734788cd43770bebc787c31aebac0a2d54d430&=&format=webp&quality=lossless&width=358&height=358' },
    //añadir mas car
    { title: 'Frutas', description: 'Uva, plátano, manzana, naranja, chirimoya', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056623167606875/81678404_Mix_fruits_-7-removebg-preview.png?ex=664188e7&is=66403767&hm=fe96f65c6bbf272ccb620fd521bc4cf912ca79c78cc647fcc641be48ebc6e36f&=&format=webp&quality=lossless&width=388&height=388' },
    { title: 'Abarrotes', description: 'Arroz, azúcar, aceite, atún, leche', imageUrl: 'https://media.discordapp.net/attachments/1239050988195942465/1239056621808648293/pixelcut-export-removebg-preview.png?ex=664188e7&is=66403767&hm=fa52f33e1b0d55e0aa9c5de336734788cd43770bebc787c31aebac0a2d54d430&=&format=webp&quality=lossless&width=358&height=358' },
  ];

  visibleSlides: any[] = [];

  constructor(private router: Router, private productoService: ProductoService, private dialog: MatDialog,private snackBar: MatSnackBar) {
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
    this.updateVisibleSlides();
  }
  /*Productos de carrucel*/

  updateVisibleSlides() {
    this.visibleSlides = this.slides.slice(this.currentSlide, this.currentSlide + 4);
  }

  showSlide(index: number) {
    this.currentSlide = index;
    this.updateVisibleSlides();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % (this.slides.length - 3);
    this.updateVisibleSlides();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % (this.slides.length - 3); // Restamos 3 para que siempre haya al menos 4 elementos visibles
    this.updateVisibleSlides();
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

  filtrarProductos(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.productosFiltrados = this.Productos.filter(producto => producto.category.toLowerCase() === categoria.toLowerCase());
  }
  /*-----------*/

  cantidadAnadida(productId: number): number {
    return this.carrito.filter(item => item.id === productId).reduce((total, item) => total + item.cantidad, 0);
  }

  incrementarContador() {
    this.contador++;
    this.snackBar.open('Producto añadido', 'Cerrar', {
      duration: 2000,
    });
  }


  isTarjetaActiva(producto: any): boolean {
    return this.productoSeleccionado === producto;
  }

  agregarAlCarrito(producto: Producto) {
    const productoEnCarrito = this.carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
      if (productoEnCarrito.cantidad < 5) {
        productoEnCarrito.cantidad++;
        this.totalCarrito += producto.price;
        this.incrementarContador();
      } else {
        this.mostrarMensaje;
      }
    } else {
      if ((this.totalCarrito + producto.price) <= 700) {
        this.carrito.push({...producto, cantidad: 1, total:0});
        this.totalCarrito += producto.price;
        this.incrementarContador();
      } else {
        this.mostrarMensaje;
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
    this.name = '';
    if (!this.searching) {
      this.productoService.getAll().subscribe((response: any) => {
        this.Productos = response;
      });
      this.verDetalle(this.producto);
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


  abrirFormularioCarrito() {
    this.mostrarFormularioCarrito = true;
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

  mostrarProducto(producto: any): boolean {
    return this.Productos.length === 0 || this.Productos.includes(producto);
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(DialogLogComponent, {
      width: '300px'
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.router.navigate(['']).then();
    console.log("Signed Out");
  }

  protected readonly Producto = Producto;

  goToHome(){
    this.router.navigateByUrl('/home-client');
  }

  goToMessenger(){
    this.router.navigateByUrl('/messenger-client');
  }
  goToProfile(){
    this.router.navigateByUrl('/profile-client');
  }
  goToFindHouse(){
    this.router.navigateByUrl('/find-house');
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }

}

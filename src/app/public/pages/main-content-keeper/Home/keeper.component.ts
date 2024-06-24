import {Component, HostListener, OnInit} from '@angular/core';
import {Router, Routes} from "@angular/router";
import { ProductoService } from "../../../services/producto.service";
import { LoginService } from "../../../services/login.service";
import {Producto} from "../../../models/producto.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DialogmessageComponent} from "../dialogmessage/dialogmessage.component";
import {WelcomeComponent} from "../welcome/welcome.component";


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

  menuAbierto: boolean = false;
  logoReducido: boolean = false;

  mostrarMensajeBusqueda: boolean = true;

  currentSlide: number = 0;

  slides = [
    { title: 'Verduras', description: 'Brócoli, rabanito, zanahoria', imageUrl: 'assets/8.webp', category: 'verduras' },
    { title: 'Carnes', description: 'Cerdo, pescado, pollo,res', imageUrl: 'assets/4.webp', category: 'carnes' },
    { title: 'Frutas', description: 'Uva, plátano, manzana', imageUrl: 'assets/6.webp', category: 'frutas'},
    { title: 'Abarrotes', description: 'Arroz, azúcar, aceite', imageUrl: 'assets/2.webp', category: 'abarrotes' },
    { title: 'Lácteos', description: 'Queso, yogurt,leche', imageUrl: 'assets/5.webp', category: 'lacteos'},
    { title: 'Panisteria', description: 'Pan, queques, tortas', imageUrl: 'assets/3.webp', category: 'panisteria' },
    { title: 'Comidas', description: 'Arroz con pollo, Aji de gallina,...', imageUrl: 'assets/7.webp', category: 'comida' },
  ];


  constructor(public dialoge: MatDialog,private router: Router, private loginService: LoginService,private productoService: ProductoService, private dialog: MatDialog,private snackBar: MatSnackBar) {
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

    if (this.loginService.getCurrentUser()) {
      this.showWelcomeDialog();
    }

  }


  isDisponible(producto: Producto): boolean {
    return producto.cantidad_stock > 0;
  }

  showWelcomeDialog() {
    const dialogRef = this.dialog.open(WelcomeComponent, {
      width: '500px',
      disableClose: true
    });

    setTimeout(() => {
      dialogRef.close();
    }, 8000); // Cierra el diálogo después de 5 segundos
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

  /*******menu home *********/
  toggleMenus() {
    this.menuAbierto = !this.menuAbierto;
  }

  toggleLogo() {
    this.logoReducido = !this.logoReducido;
  }
  /*----------------*/
  openDialoge(): void {
    this.dialog.open(DialogmessageComponent, {
      width: '380px',
      height: '280',
      data: { message: 'Sus compras son menores a S/. 100 ' +
          'Añada más productos al carrito 😊' }
    });
  }

  openDialoge2(): void {
    this.dialog.open(DialogmessageComponent, {
      width: '380px',
      height: '280',
      data: { message: 'Sus compras excede el limite permitido a S/. 500 ' }
    });
  }

  comprobarTotalYMostrarMensaje() {
    if (this.totalCarrito < 100 ) {
      this.openDialoge();
    } else if(this.totalCarrito > 500) {
      this.openDialoge2();
    } else{
      this.irAPagar();
    }
  }

  comprobarMostrarMensaje() {
    if (this.totalCarrito < 0 ) {
      this.openDialoge();
    } else{
      this.PagosFuturos();
    }
  }


  irAPagar() {
    this.router.navigate(['/card']);
    console.log("Redirigiendo a la página de pago...");
  }

  PagosFuturos() {
    this.router.navigate(['/card-future']);
    console.log("Redirigiendo a la página de pago...");
  }

  /***********************/
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
      if ((this.totalCarrito + producto.price) <= 900) {
        if (producto.cantidad_stock > 0) {
          this.carrito.push({...producto, cantidad: 1, total: producto.price});
          this.totalCarrito += producto.price;
          this.loginService.actualizarTotal(this.totalCarrito);
          this.incrementarContador();
        } else {
          this.mostrarMensajes('Este producto está agotado');
        }
      } else {
        this.mostrarMensajes('El total del carrito excede el límite de S/. 900');
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
      this.snackBar.open('No hay ningún producto añadido en el carrito 🚗', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
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

  /*mesaage*/
  openDialog(): void {
    this.dialog.open(DialogmessageComponent, {
      width: '250px',
      data: { message: 'Sus compras son menores a 700. Añada más productos' }
    });
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

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MensajeriaService} from "../../../services/mensajeria.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Mensajeria} from "../../../models/mensajeria";
import {Producto} from "../../../models/producto.service";
import {ProductoService} from "../../../services/producto.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-messenger-keeper',
  templateUrl: './messenger-keeper.component.html',
  styleUrls: ['./messenger-keeper.component.css']
})
export class MessengerKeeperComponent implements OnInit{

  mensaje:Mensajeria[]=[];
  mostrarFormularioCarrito: boolean = false;
  contador: number = 0;
  Productos: Producto[] = [];
  Categorias: any[] = [];
  name: string;
  price: number;
  description: string;
  category: String;
  disponibilidad: string;
  cantidad_stock: number;
  valoracion: string;

  searching: boolean = false;
  showDialog: boolean = false;

  constructor(private router: Router, private productoService: ProductoService,private mensajeriaservice:MensajeriaService, private dialog: MatDialog,private snackBar: MatSnackBar) {
    this.name = '';
    this.price = 0;
    this.description = '';
    this.category = '';
    this.disponibilidad = '';
    this.cantidad_stock = 0;
    this.valoracion = '';
  }

  ngOnInit() {

    this.mensajeriaservice.getAll().subscribe((response:any)=>{

      this.mensaje=response
    })
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

  cerrarFormulario(): void {

    console.log('Cerrando formulario de carrito...');
    this.hideUserDialog();
  }

  /*----------------*/


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
    }
  }

  goToMessenger(){
    this.router.navigateByUrl('/messenger-client');
  }
  goToKeeper(){
    this.router.navigateByUrl('/home-client');
  }
  goToFindHouse(){
    this.router.navigateByUrl('/find-house');
  }
  goToProfile(){
    this.router.navigateByUrl('/profile-client');
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }
}

import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { UpdateProfileComponent } from "../../update-profile/update-profile.component";
import { MatDialog } from "@angular/material/dialog";
import { formatDate } from "@angular/common";
import {Producto} from "../../../models/producto.service";
import {ProductoService} from "../../../services/producto.service";
import {MensajeriaService} from "../../../services/mensajeria.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-profile-keeper',
  templateUrl: './profile-keeper.component.html',
  styleUrls: ['./profile-keeper.component.css']
})
export class ProfileKeeperComponent implements OnInit{
  usuarioActual: any;

  mostrarFormularioCarrito: boolean = false;
  contador: number = 0;
  Productos: Producto[] = [];
  Categorias: any[] = [];

  price: number;
  description: string;
  category: String;
  disponibilidad: string;
  cantidad_stock: number;
  valoracion: string;

  searching: boolean = false;
  showDialog: boolean = false;

  constructor(private router: Router,private loginService: LoginService, private productoService: ProductoService,private mensajeriaservice:MensajeriaService, private dialog: MatDialog,private snackBar: MatSnackBar) {
    this.price = 0;
    this.description = '';
    this.category = '';
    this.disponibilidad = '';
    this.cantidad_stock = 0;
    this.valoracion = '';

  }

  ngOnInit() {
    this.usuarioActual = this.loginService.getCurrentUser();
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

    this.hideUserDialog();
  }

  /*----------------*/



  goToKeeper() {
    this.router.navigateByUrl('/home-client');
  }
  goToFindHouse() {
    this.router.navigateByUrl('/find-house');
  }
  goToMessenger() {
    this.router.navigateByUrl('/messenger-client');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  openUpdateDialog(): void {

    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '500px',
      data: { firstname: this.usuarioActual.firstname, lastName: this.usuarioActual.lastName, phone: this.usuarioActual.phoneNumber, email: this.usuarioActual.email }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.usuarioActual.firstname = result.firstname;
        this.usuarioActual.lastName = result.lastName;
        this.usuarioActual.phoneNumber = result.phone;
        this.usuarioActual.email = result.email;
      }
    });
  }
  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.router.navigate(['']).then();
    console.log("Signed Out");
  }
}

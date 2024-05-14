import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {MensajeriaService} from "../../../services/mensajeria.service";
import {KeepersService} from "../../../services/keepers.service";
import {keepers} from "../../../models/keepers";
@Component({
  selector: 'app-find-keeper',
  templateUrl: './find-keeper.component.html',
  styleUrls: ['./find-keeper.component.css']
})
export class FindKeeperComponent implements OnInit{
  keepers: keepers[] = [];
  country: string;
  city: string;
  streetAddress: string;
  rating: number;

  constructor(private router: Router, private keeperService: KeepersService, private mensajeriaService: MensajeriaService) {
    this.country = '';
    this.city = '';
    this.streetAddress = '';
    this.rating = 0;
  }

  onFilter() {
    var filteredKeepers = [...this.keepers];

    if (this.country) {
      filteredKeepers = filteredKeepers.filter(
        keeper => keeper.country.toLowerCase().includes(this.country.toLowerCase())
      );
    }
    if (this.city) {
      filteredKeepers = filteredKeepers.filter(
        keeper => keeper.city.toLowerCase().includes(this.city.toLowerCase())
      );
    }
    if (this.streetAddress) {
      filteredKeepers = filteredKeepers.filter(
        keeper => keeper.streetAddress.toLowerCase().includes(this.streetAddress.toLowerCase())
      );
    }
    if (this.rating !== null && this.rating !== undefined) {
      const ratingFormateado = `${this.rating}`;
      filteredKeepers = filteredKeepers.filter(keeper => keeper.rating.toString() === ratingFormateado);
    }

    this.keepers = filteredKeepers;
  }

  toReset() {
    this.country = '';
    this.city = '';
    this.streetAddress = '';
    this.rating = 0;

    // Vuelve a obtener todos los keepers
    this.keeperService.getAll().subscribe((response: any) => {
      this.keepers = response;
    });
  }

  ngOnInit() {
    // Obtén todos los keepers al iniciar el componente
    this.keeperService.getAll().subscribe((response: any) => {
      this.keepers = response;
    });
  }
  goToTraveler(){
    this.router.navigateByUrl('/home-traveller');
  }
  goToFindKeeper(){
    this.router.navigateByUrl('/find-keeper');
  }
  goToMessenger(){
    this.router.navigateByUrl('/messenger-traveler');
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }
  goToProfile(){
    this.router.navigateByUrl('/profile-traveler');
  }
  getCurrentUserName() {
    let currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      console.log(`current user: ${currentUserString}`);
      let currentUser = (JSON.parse(currentUserString));
      console.log(currentUser);
      return currentUser.name;
    } else return null;

  }
  solicitarKeeper(keeperName: string) {
    const currentUser = this.getCurrentUserName();

    if (currentUser) {
      const mensaje = {
        nombre: currentUser,
        description: "Quiero solicitar tus servicios, pongámonos en contacto",
        photoFace: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
      };

      // Llama al servicio para guardar el mensaje
      this.mensajeriaService.guardarMensaje(mensaje).subscribe(
        (response) => {
          console.log('Mensaje guardado con éxito', response);
        },
        (error) => {
          console.error('Error al guardar el mensaje', error);
        }
      );
    }
  }
}

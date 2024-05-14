import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MensajeriaTravellerService} from "../../../services/mensajeria-traveller.service";
import {MensajeriaTraveller} from "../../../models/mensajeriaTraveller";

@Component({
  selector: 'app-messenger-traveler',
  templateUrl: './messenger-traveler.component.html',
  styleUrls: ['./messenger-traveler.component.css']
})
export class MessengerTravelerComponent implements OnInit{

  mensaje:MensajeriaTraveller[]=[];

  constructor(private router: Router,private mensajeriaservice:MensajeriaTravellerService){}

  ngOnInit() {

    this.mensajeriaservice.getAll().subscribe((response:any)=>{

      this.mensaje=response
    })
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
}

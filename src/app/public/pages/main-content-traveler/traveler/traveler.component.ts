import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {keeperRequest} from "../../../models/keeperRequest";
import {KeeperRequestService} from "../../../services/keeper-request.service";


@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.css']
})
export class TravelerComponent implements OnInit{
  keeperRequest:keeperRequest[]=[];
  title='';

  constructor(private router: Router,private keeperService:KeeperRequestService){}
  ngOnInit() {

    this.keeperService.getAll().subscribe((response:any)=>{

      this.keeperRequest=response
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

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  currentSlide: number = 0;

  slides = [
    { title: 'Minimarket Yoes', imageUrl: 'assets/post1.jpg' },
    { title: 'Minimarket Yoes', imageUrl: 'assets/poster8.jpg'},
    { title: 'Minimarket Yoes', imageUrl: 'assets/poster10.jpg'},
    { title: 'Minimarket Yoes',  imageUrl: 'assets/post2.jpg' },
    { title: 'Minimarket Yoes', imageUrl: 'assets/poster7.jpg'},
    { title: 'Minimarket Yoes', imageUrl: 'assets/poster11.jpg'},
    { title: 'Minimarket Yoes', imageUrl: 'assets/post3.jpg'},
    { title: 'Minimarket Yoes', imageUrl: 'assets/post6.jpg'},
    { title: 'Minimarket Yoes', imageUrl: 'assets/poster12.jpg'},
    { title: 'Minimarket Yoes', imageUrl: 'assets/post4.jpg' },
    { title: 'Minimarket Yoes', imageUrl: 'assets/post5.jpg'},
    { title: 'Minimarket Yoes', imageUrl: 'assets/poster9.jpg'},


  ];

  selectedUserType: 'login' | 'client' | 'admin' = 'login';

  constructor(private router: Router){}
  goToRegister(){
    this.router.navigateByUrl('/register-keeper');
  }

  ngOnInit() {
    this.autoNextSlide();
  }

  /*******************************/
  nextSlide() {
    if (this.currentSlide < this.slides.length - 2) {
      this.currentSlide += 1;
    } else {
      this.currentSlide = 0;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide -= 1;
    } else {
      this.currentSlide = this.slides.length - 2;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  get visibleSlides() {
    return this.slides.slice(this.currentSlide, this.currentSlide + 2);
  }


  autoNextSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  /**********************************/

  goToKeeper(){
    this.router.navigateByUrl('/home-keeper');
  }

  goToTraveller(){
    this.router.navigateByUrl('/home-traveller');
  }
  goToLogin(){
    this.router.navigateByUrl('/sign-in');
  }


  login(){
    if(this.selectedUserType == 'client'){
      this.goToKeeper();
    }
    else if(this.selectedUserType == 'admin')
    {
      this.goToTraveller();
    }
  }

}

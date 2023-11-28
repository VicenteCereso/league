import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router){}
games(){
  this.router.navigate(['games']);
}
teams(){
  this.router.navigate(['team']);
}
players(){
  this.router.navigate(['player']);
}
}

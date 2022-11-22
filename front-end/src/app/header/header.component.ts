import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private _flashMessagesService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ){}

  logoutUser(){
    this.authService.logout()
    this._flashMessagesService.show("You are logged out", 
      { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/auth'])
  }
}

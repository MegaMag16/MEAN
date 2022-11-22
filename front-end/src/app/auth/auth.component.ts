import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  login: string = ''
  password: string = ''

  constructor(private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {
      
    }

  signIn(){
    const user = {
      login: this.login,
      password: this.password,
    }
    
    if(!user.login){
      this._flashMessagesService.show('Enter your login!', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    if(!user.password){
      this._flashMessagesService.show('Enter your password!', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    this.authService.authUser(user).subscribe((data : any) => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg, 
        { cssClass: 'alert-danger', timeout: 3000 });
      }else{
        this._flashMessagesService.show("Success!", 
          { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/dashboard'])
          this.authService.storeUser(data.token, data.user)
      }
    })

    return false
  }
}

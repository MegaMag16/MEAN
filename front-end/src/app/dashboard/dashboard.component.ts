import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title: string = ''
  category: string = ''
  photo: string = ''
  text: string = ''

  constructor(private _flashMessagesService: FlashMessagesService,
              private authService: AuthService, private router: Router) {}

  createPost(){
    const post = {
      title: this.title,
      category: this.category,
      photo: this.photo,
      text: this.text,
      author: JSON.parse(localStorage.getItem('user') || "{}").login,
      date: new Date()
    }
    if(!post.title){
      this._flashMessagesService.show('Enter title!', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    if(!post.category){
      this._flashMessagesService.show('Select a category!', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    if(!post.photo){
      this._flashMessagesService.show('Insert a photo!', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    if(!post.text){
      this._flashMessagesService.show('Enter any text!', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    console.log(post)

    this.authService.createPost(post).subscribe((data : any) => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg, 
        { cssClass: 'alert-danger', timeout: 3000 });
      }else{
        this._flashMessagesService.show(data.msg, 
          { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/'])
      }
    })

    return false
  }
}

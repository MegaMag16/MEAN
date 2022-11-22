import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
//import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token: any
  user: any

  constructor(
    private http : HttpClient,
    private helper : JwtHelperService
  ) { }

  registerUser(user : any){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/account/reg', user, 
    { headers: headers}).pipe(map(res => res))
  }

  authUser(user : any) {
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/account/auth', user, 
    { headers: headers}).pipe(map(res => res))
  }

  storeUser(token: any, user: any){
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    this.token = token
    this.user = user
  }

  logout(){
    this.token = null
    this.user = null
    localStorage.clear()
  }

  isAuth(){
    //return tokenNotExpired()
    return !this.helper.isTokenExpired(this.token);
  }

  createPost(post: any){
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .append('Authorization', this.token)
    return this.http.post('http://localhost:3000/account/dashboard', post, 
    { headers: headers}).pipe(map(res => res))
  }

  getAllPosts(){
    return this.http.get('http://localhost:3000/').pipe(map(res => res))
  }

  getPostById(id: string) {
    return this.http.get(`http://localhost:3000/post/${id}` ).pipe(map(res => res))
  }

  deletePost(id: string){
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .append('Authorization', this.token)
    return this.http.delete(`http://localhost:3000/post/${id}`, { headers: headers}).pipe(map(res => res))
  }
}

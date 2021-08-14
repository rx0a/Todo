import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { 
  }

  loginUser: User = new User();

  login(user: User) {
console.log(user);
this.auth.login(user.username, user.password).subscribe(
  loggedIn => {
    console.log('LoginComponent.login(): User logged in.');
    this.router.navigateByUrl('/todo');
    
  },
  fail => {
    console.log('LoginComponent.login(): login failed.');
    
  }
)

  }

}

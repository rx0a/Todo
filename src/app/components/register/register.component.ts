import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


register(theForm: NgForm) {
let newUser = theForm.value;
console.log(newUser);
//register via auth service
this.auth.register(newUser).subscribe(
  user => {
    console.log("RegisterCompenent.register(): user registered.");
    this.auth.login(newUser.username, newUser.password).subscribe(
      loggedInUser => {
        console.log("RegisterCompenent.register(): user logged in..");
        this.router.navigateByUrl('/todo');
      },
      noJoy => {
        console.error('RegisterComponent,register(): Login failed.')
        console.error(noJoy);
        
        this.router.navigateByUrl('/login');

      }
    );
    
  },
  fail => {
    console.error('RegisterComponent,register(): Register failed.')
    console.error(fail);
    
    this.router.navigateByUrl('/register');
  }
);
}


}

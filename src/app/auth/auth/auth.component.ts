import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isLoginMode: boolean = true;
  isLoading:boolean = false
  error:string = null
  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    console.log(form.value.email)
    console.log(form.value.password)
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email,password)

    this.isLoading = true
    if (this.isLoginMode) {

    } else {
      this.authService.signup(email, password).subscribe(
        resData => {
          console.log(resData)
          this.isLoading = false;
        },(error)=>{
          console.error(error)
          this.error = 'An Error Occurred'
          this.isLoading = false;
        }
      )
    }


    form.reset()
  }
}

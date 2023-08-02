import { Component, OnDestroy, ViewChild, ViewContainerRef, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert/alert.component';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {

  @ViewChild('alert', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  private closeSub: Subscription;

  isLoginMode: boolean = true;
  isLoading: boolean = false
  error: string = null
  constructor(private authService: AuthService,
    private router: Router,
  ) { }


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

    let authObs: Observable<AuthResponseData>

    this.isLoading = true
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData)
        this.isLoading = false
        this.router.navigate(['/recipies'])
      },
      error: (error) => {
        this.error = error;
        this.showErrorAlert(error)
        this.isLoading = false;
      }
    })


    form.reset()
  }


  private showErrorAlert(message: string) {
    this.viewContainerRef.clear()
    const alertComp = this.viewContainerRef.createComponent(AlertComponent)
    alertComp.instance.message = message;
    this.closeSub = alertComp.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      this.viewContainerRef.clear()
    }

    )
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }
}

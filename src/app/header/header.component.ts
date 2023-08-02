import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent  implements OnInit,OnDestroy{
  isAuthenticated:boolean = false;
  private userSub:Subscription

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }
 ngOnInit(): void {
   this.userSub=  this.authService.user.subscribe(user=>{
this.isAuthenticated = !user? false : true;
   })
 }

  onSaveData() {
    this.dataStorageService.storeRecipe()
  }
  onFetchData() {
    this.dataStorageService.fetchRecipe().subscribe(user=>{
      console.log(user)
    })

  }
  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()  
  }
}
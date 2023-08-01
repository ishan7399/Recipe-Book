// import { Injectable } from "@angular/core";
// import { ActivatedRoute, ResolveFn, RouterStateSnapshot } from "@angular/router";
// import { Recipe } from "./recipe.model";
// import { DataStorageService } from "../shared/data-storage.service";

// @Injectable({providedIn:'root'})
// export class RecipiesResolverService implements ResolveFn<Recipe[]>{
// constructor(private dataStorageService:DataStorageService){}

// resolve(route:ActivatedRoute,state : RouterStateSnapshot){
//     return this.dataStorageService.fetchRecipe()
// }
// }
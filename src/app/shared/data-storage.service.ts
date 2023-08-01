import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipies/recipe.model";
import { RecipeService } from "../recipies/recipe.service";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService) { }



    storeRecipe() {
        const recipes = this.recipeService.getRecipies();
        this.http.put('https://ng-recipe-book-6e229-default-rtdb.firebaseio.com/recipies.json',
            recipes).subscribe(response => {
                // console.log(recipes)
            })
    }

    fetchRecipe(){
        this.http.get<Recipe[]>('https://ng-recipe-book-6e229-default-rtdb.firebaseio.com/recipies.json').
        pipe(map(recipies=>{
            return recipies.map(recipie=>{
                return {...recipie,ingredents: recipie.ingredents?recipie.ingredents : []}
            })
        }))
        .subscribe(
            recipies=>{
       
            this.recipeService.setRecipies(recipies)
            }
        )
    }
}
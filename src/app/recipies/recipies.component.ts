import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.scss'],
  providers:[RecipeService]
})
export class RecipiesComponent implements OnInit{
  
selectedRecipe: Recipe;
constructor(private recipeService : RecipeService){}

ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe:Recipe)=>{
        this.selectedRecipe = recipe
      }
    )
}
}

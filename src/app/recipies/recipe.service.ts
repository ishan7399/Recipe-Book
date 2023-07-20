import { EventEmitter,Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
recipeSelected = new EventEmitter<Recipe>()

    private recipies: Recipe[] = [

        new Recipe(
            "Test Recipe", 
            'This is simply a test', 
            'https://picsum.photos/100/150',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries',20),
            ]),
        new Recipe(
            "Another Test Recipe", 
            'This is simply a test', 
            'https://picsum.photos/400/300',
            [
                new Ingredient('Buns',3),
                new Ingredient('Meat',1),

            ]),
    ];
constructor(private shoppingListService:ShoppingListService){}
    getRecipies() {
        return this.recipies.slice();
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients)
    }
}
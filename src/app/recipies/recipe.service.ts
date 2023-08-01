import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>

    // private recipies: Recipe[] = [

    //     new Recipe(
    //         "Test Recipe",
    //         'This is simply a test',
    //         'https://picsum.photos/100/150',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20),
    //         ]),
    //     new Recipe(
    //         "Another Test Recipe",
    //         'This is simply a test',
    //         'https://picsum.photos/400/300',
    //         [
    //             new Ingredient('Buns', 3),
    //             new Ingredient('Meat', 1),

    //         ]),
    // ];

    private recipies : Recipe[]=[];
    
    constructor(private shoppingListService: ShoppingListService) { }
    setRecipies(recipies:Recipe[]){
    this.recipies = recipies
    this.recipesChanged.next(this.recipies.slice())
    }
    getRecipies() {
        return this.recipies.slice();
    }
    getRecipe(index: number) {
        return this.recipies[index]
    }
    addRecipe(recipe: Recipe) {
        this.recipies.push(recipe)
        this.recipesChanged.next(this.recipies.slice())
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipies[index] = newRecipe;
        this.recipesChanged.next(this.recipies.slice())
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients)
    }
    deleteRecipe(index:number){
this.recipies.splice(index,1)
this.recipesChanged.next(this.recipies.slice())
    }
}
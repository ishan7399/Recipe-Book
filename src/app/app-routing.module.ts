import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipies/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/recipies', pathMatch: 'full' },
  {
    path: 'recipies', component: RecipiesComponent, 
    canActivate:[AuthGuard]
,    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id', component: RecipeDetailsComponent,
        // resolve: [RecipiesResolverService]
      },
      {
        path: ':id/edit', component: RecipeEditComponent,
        // resolve: [RecipiesResolverService]
      },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  {path:'auth',component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

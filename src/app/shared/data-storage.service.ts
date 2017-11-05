import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

  constructor(
    private http: Http,
    private recipeService: RecipeService
  ) { }


  storeRecipes() {
    return this.http.put('https://ng-htt-udemy.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {

    return this.http.get('https://ng-htt-udemy.firebaseio.com/recipes.json')
      .map(res => res.json() as Recipe[])
      .map(recipes => recipes.map(this.fetchRecipesIngridients))
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }

  private fetchRecipesIngridients(recipe){
    if (this.hasNoIngridients(recipe)) {
      recipe['ingridients'] = [];
    }
    return recipe;
  }

  private hasNoIngridients(recipe){
    return !recipe['ingridients'];
  }

}

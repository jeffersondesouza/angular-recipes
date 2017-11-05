import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }


  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  initForm() {

    let recipeName;
    let recipeImagePath;
    let recipeDescription;
    let recipeIngridients: FormArray = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {

        recipe.ingredients
          .forEach(ing => {
            recipeIngridients.push(
              new FormGroup({
                name: new FormControl(ing.name),
                amount: new FormControl(ing.amount)
              })
            );
          });
      }

    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingridients: recipeIngridients
    });
  }


  onSubmit({ value, valid }) {

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, value);
      this.router.navigate(['../'], { relativeTo: this.route });     
    } else {
      this.recipeService.addRecipe(value);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
    

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngridient() {
    (<FormArray>this.recipeForm.get('ingridients')).push(new FormGroup({
      name: new FormControl(''),
      amount: new FormControl('')
    }));
  }

  onDeleteIngridient(index:number){
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }
}

import { NgForm } from '@angular/forms';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  editMode = false;
  editIngridientIndex;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.slService.editingIngredient$
      .subscribe(editIngridientIndex => {
        const editIngridient = this.slService.getIngredient(editIngridientIndex);
        this.editMode = true;
        this.editIngridientIndex = editIngridientIndex;

        this.form.setValue({
          name: editIngridient.name,
          amount: editIngridient.amount
        });

      });
  }

  onSubmit() {
    const value = this.form.value;

    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.onEditIngridient(ingredient);
    } else {
      this.onAddItem(ingredient);
    }

    this.resetForm();

  }
  onAddItem(ingredient) {
    this.slService.addIngredient(ingredient);
  }

  onEditIngridient(ingredient) {
    this.slService.updateIngredient(this.editIngridientIndex, ingredient);
  }

  onClearForm() {
    this.resetForm();
  }

  onDelete() {
    this.slService.deletIngridient(this.editIngridientIndex);
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
  }

}

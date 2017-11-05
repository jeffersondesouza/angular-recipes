import { DataStorageService } from './../shared/data-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService
  ) { }

  saveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(res => console.log(res));
  }

  fetchData() {
    this.dataStorageService.getRecipes();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import {FruitTableViewModel} from './fruit-table-view-model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FruitSort } from '../../models/sorting';
import { Fruit } from '../../models/fruit';

@Component({
  selector: 'app-fruit-table',
  templateUrl: './fruit-table.component.html',
  styleUrls: ['./fruit-table.component.scss'],
  providers: [FruitTableViewModel]
})
export class FruitTableComponent implements OnInit {
  subs: Subscription[] = [];
  columnsToDisplay = ['id', 'name', 'genus', 'calories', 'carbohydrates', 'sugar'];
  filterControl = new FormControl('');
  sortingControl = new FormControl<FruitSort>(null);
  fruitSortingOrder = [
    FruitSort.NAME_ASC,
    FruitSort.NAME_DESC,
    FruitSort.CARBS_ASC,
    FruitSort.CARBS_DESC
  ];
  constructor(public viewModel: FruitTableViewModel) {

  }

  ngOnInit(): void {
    this.subs.push(
      this.filterControl.valueChanges.pipe(
        debounceTime(250),
        distinctUntilChanged()
      ).subscribe(fruitFilterTerm => this.viewModel.filterFruit(fruitFilterTerm))
    );

    this.subs.push(
      this.sortingControl.valueChanges.pipe(
        debounceTime(250),
        distinctUntilChanged()
      ).subscribe(sortingVal => this.viewModel.sortFruit(sortingVal))
    );
  }

  getCaloriesRowClass(value: Fruit) {
    return value.nutritions.calories <= 50 ? 'bold' : ''
  }

  getDataRowClasses(value: Fruit) {
    return value.nutritions.calories <= 50 && value.nutritions.sugar >= 8 ? 'special-row-color' : ''
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    this.viewModel.destroy();
  }
}

import {Injectable} from '@angular/core';
import {FruityViceService} from '../../services/fruity-vice-service';
import {BehaviorSubject, combineLatest, map, Subject, takeUntil} from 'rxjs';
import {Fruit} from '../../models/fruit';
import {FruitSort} from '../../models/sorting';

@Injectable()
export class FruitTableViewModel {
  fruitData$ = new BehaviorSubject<Fruit[]>(null);
  unfilteredFruitData$ = new BehaviorSubject<Fruit[]>([]);
  filterTerm$ = new BehaviorSubject<string>(null);
  loadingFruit$ = new BehaviorSubject<boolean>(false);
  fruitSortingOrder$ = new BehaviorSubject<FruitSort>(null);
  private destroy$ = new Subject<void>();

  constructor(private fruitService: FruityViceService) {
    this.loadingFruit$.next(true);
    this.fruitService.getAllFruits().subscribe(fruitResponse => {
      this.loadingFruit$.next(false);
      this.unfilteredFruitData$.next(fruitResponse);
    });

    combineLatest([this.unfilteredFruitData$, this.filterTerm$, this.fruitSortingOrder$]).pipe(
      takeUntil(this.destroy$),
      map(
        ([origFruit, term, fruitSort]) => {
          const result: Fruit[] = term ? origFruit.filter(fruitItem => {
              term = term.toLowerCase();
              return (
                fruitItem.genus.toLowerCase().includes(term) ||
                fruitItem.name.toLowerCase().includes(term) ||
                fruitItem.family.toLowerCase().includes(term) ||
                fruitItem.order.toLowerCase().includes(term)
              )
            }) : [...origFruit];
          if(fruitSort == FruitSort.CARBS_ASC) result.sort( (a,b) => a.nutritions.carbohydrates - b.nutritions.carbohydrates);
          if(fruitSort == FruitSort.CARBS_DESC) result.sort( (a,b) => b.nutritions.carbohydrates - a.nutritions.carbohydrates);
          if(fruitSort == FruitSort.NAME_ASC) result.sort( (a,b) => a.name.localeCompare(b.name));
          if(fruitSort == FruitSort.NAME_DESC) result.sort( (a,b) => b.name.localeCompare(a.name));
          return result
        }
      )
    ).subscribe(
      filteredFruit => this.fruitData$.next(filteredFruit)
    );
  }

  filterFruit(fruitFilterTerm: string) {
    this.filterTerm$.next(fruitFilterTerm);
  }

  sortFruit(fruitSortType: FruitSort) {
    this.fruitSortingOrder$.next(fruitSortType);
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

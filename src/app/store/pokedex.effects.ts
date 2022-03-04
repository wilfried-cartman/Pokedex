import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as pokedexActions from './pokedex.action';
import { ApiService } from '../shared/services/api.service';
import { PokedexDataContract } from '../models/pokedex';

@Injectable()
export class PokedexEffects {
  public readonly StoreDictionnary = new Map<string, PokedexDataContract>();
  public readonly QueueDictionnary = new Map<string, BehaviorSubject<PokedexDataContract>>();

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  getPokedexAll$ = createEffect(() => this.actions$.pipe(
    ofType(pokedexActions.getPokedex),
    switchMap(({ url, page, forceReset }) => {
      if(!forceReset && this.StoreDictionnary.get(page)){
        const observable = this.QueueDictionnary.get(page)?.asObservable() || new Observable();
        return from(observable).pipe(
          map((data: PokedexDataContract) => {
            return pokedexActions.getPokedexSuccess({data});
          }),
        );
      }       
      else {
        return from(this.apiService.get<any>(url)).pipe(
          map((data: PokedexDataContract) => {
            this.StoreDictionnary.set(page, data);
            this.QueueDictionnary.set(page, new BehaviorSubject<PokedexDataContract>(data));
            return pokedexActions.getPokedexSuccess({data});
          }),
        );
      }
    })
  ));

}
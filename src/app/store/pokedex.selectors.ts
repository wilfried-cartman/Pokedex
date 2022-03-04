import { createSelector } from '@ngrx/store';
import { IPokedexState } from './pokedex.reducer';

export const selectPokedexState = (state: IPokedexState) => state;

export const getPokedexSelector = createSelector(
    (state: IPokedexState) => state,
    (state: any) => state.pokedex?.data,
);
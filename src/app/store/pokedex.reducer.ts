import { createReducer, on } from '@ngrx/store';
import { PokedexDataContract } from '../models/pokedex';
import * as pokedexActions from './pokedex.action';

export interface IPokedexState {
  data: PokedexDataContract;
}
const initialState: IPokedexState = {data: {}} as IPokedexState;
export const pokedexReducer = createReducer(
  initialState,
  on(pokedexActions.getPokedex, (state) => ({...state})),
  on(pokedexActions.getPokedexSuccess, (state, data) => ({...data})),
);
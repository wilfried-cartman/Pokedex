import { createAction, props } from '@ngrx/store';
import { PokedexDataContract } from '../models/pokedex';

export const getPokedex = createAction(
    '[POKEDEX] List',
    props<{ url: string, page: string }>()
);

export const getPokedexSuccess = createAction(
    '[POKEDEX] List Success',
    props<{ data: PokedexDataContract }>()
);
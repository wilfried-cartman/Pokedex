import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PokedexListComponent } from './pokedex/pokedex-list/pokedex-list.component';

const routes: Routes = [
  {
    path: '',
    component: PokedexListComponent,
    children: [
      {
        path: 'pokedex',
        component: PokedexListComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PokedexListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

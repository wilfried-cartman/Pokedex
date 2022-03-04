import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { PokedexListComponent } from './pokedex/pokedex-list/pokedex-list.component';
import { PokedexDetailComponent } from './pokedex/pokedex-detail/pokedex-detail.component';

@NgModule({
  declarations: [
    PagesComponent,
    PokedexListComponent,
    PokedexDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }

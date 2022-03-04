import { Component, Input, OnInit } from '@angular/core';
import Pokedex, { Type } from '../../../models/pokedex';

@Component({
  selector: 'app-pokedex-detail',
  templateUrl: './pokedex-detail.component.html',
  styleUrls: ['./pokedex-detail.component.scss']
})
export class PokedexDetailComponent implements OnInit {

  @Input() data: Pokedex = {} as Pokedex;
  constructor() { }

  ngOnInit(): void {
  }
  
  getTypesAsString(types: Type[] = []): string{
    return types ? types.map(x => x.type?.name).join(' | ') : '';
  }

}

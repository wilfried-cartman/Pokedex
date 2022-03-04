import { Component, OnInit } from '@angular/core';
import QueryParamsModel from './../../../models/queryParams.model'
import TablePagesModel from './../../../models/tablePages.model'
import Pokedex, { PokedexDataContract, Species } from './../../../models/pokedex'
import { ApiService } from './../../../shared/services/api.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { getPokedex } from '../../../store/pokedex.action';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { IPokedexState } from '../../../store/pokedex.reducer';
import { getPokedexSelector } from '../../../store/pokedex.selectors';
import { UtilsMethods } from '../../../shared/services/utils.methods';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class PokedexListComponent implements OnInit {
  queryParams: QueryParamsModel;
  pagination: TablePagesModel;
  areDatasLoading = false;
  ActiveClass: string = 'active';
  pokedexList: Pokedex[] = [];
  pokedexList$: Observable<PokedexDataContract> = new Observable<PokedexDataContract>();
  
  currentPage: number = 0;
  selectedPokedex: Pokedex;
  isDetailLoading: boolean = false;

  constructor(
    private api: ApiService, config: NgbModalConfig,
    private modalService: NgbModal,
    private store: Store<IPokedexState>) {
    this.queryParams = {} as QueryParamsModel;
    this.pagination = {} as TablePagesModel;
    this.selectedPokedex = {} as Pokedex;
    this.queryParams.paged = true;
    this.queryParams.offset = 0;
    this.queryParams.limit = environment.pageSize;
    this.currentPage = 1;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(){
    this.goToPage(this.currentPage);
  }

  onSelectedItem(item: Pokedex, content: any){
    if(item){
      this.isDetailLoading = true;
      this.modalService.open(content);
      this.api.get<Pokedex>(item.url).subscribe(
        (data: any) =>{
          this.isDetailLoading = false;
          this.selectedPokedex = {} as Pokedex;
          if(data){
            this.selectedPokedex = {...this.selectedPokedex, ...data} as Pokedex;
            if(this.selectedPokedex.species?.url){
              this.getEvolution(this.selectedPokedex.species.url);
            }
          }
        }
      )
    };   
  }
  
  getEvolution(url: string){
    if(url){
      this.api.get<Pokedex>(url).subscribe(
        (data: any) =>{
          this.selectedPokedex.species = {} as Species;
          if(data){
            this.selectedPokedex.species = {...data} as Species;
            this.selectedPokedex = {...this.selectedPokedex};
          }
        }
      )
    };   
  }

  goToPage(page: number): void{
    this.currentPage = page;
    page = (page - 1);
    this.areDatasLoading = true;
    const url = `${environment.apiUrl}?offset=${page*this.queryParams.limit}&limit=${this.queryParams.limit}`
    this.store.dispatch(getPokedex({ url, page: page.toString() }));
    this.store.pipe(
      select(getPokedexSelector),
      delay(10)
    )
    .subscribe((data: PokedexDataContract) => {
      let totalItems = 0;
      if(data){
        this.pokedexList = data.results;
        totalItems = data.count;
      } else {
        this.pokedexList = [];
      }
      this.pagination = UtilsMethods.generatePages(totalItems, this.queryParams);
      this.areDatasLoading = false;
    });
  }
  
  prevPage(): void{
    if(this.currentPage > 1){
      this.currentPage -= 1;
      this.goToPage(this.currentPage);
    }
  }
  
  nextPage():void{
    if(this.currentPage < this.pagination.pagesTotal){
      this.currentPage += 1;
      this.goToPage(this.currentPage);
    }
  }

}

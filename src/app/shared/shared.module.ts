import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ApiService } from './services/api.service';
const COMPONENTS = [
  HeaderComponent
]
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
  ],
  exports: [...COMPONENTS],
  providers: [ApiService]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [ApiService],
    }
  }
}

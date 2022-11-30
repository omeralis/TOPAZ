import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseListComponent } from './case-list/case-list.component';
import { CaseRoutingModule } from './case-routing.module';



@NgModule({
  declarations: [
  
    CaseListComponent
  ],
  imports: [
    CommonModule,
    CaseRoutingModule
  ]
})
export class CaseModule { }

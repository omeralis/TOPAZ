import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { CaseListComponent } from './case-list/case-list.component';
import { CaseRoutingModule } from './case-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicallyJsonFormComponent } from 'src/app/shared/component/dynamically-json-form/dynamically-json-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CaseListComponent,
    DynamicallyJsonFormComponent
  ],
  imports: [
    CommonModule,
    CaseRoutingModule,
    IconsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CaseModule { }

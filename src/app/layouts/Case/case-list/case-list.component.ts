import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonFormData } from 'src/app/shared/models/dynamically-form/dynamically-form';
import { Case } from '../models/case';
// import { DynamicallyJsonFormComponent } from 'src/app/shared/component/dynamically-json-form/dynamically-json-form.component';
import { CaseService } from '../services/case.service';
@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  isAccordionToggledfilter: boolean = false;
  public formData?: JsonFormData;
  myForm: any;
  userData: any;
  // case_status = 'active';
  // dataCase : Case;
  dataCase = {} as Case;
  DataResponse: any[] = [];
  constructor(private caseService: CaseService, private modalService: NgbModal, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getDataUser();
    console.log('ddd', this.formData)
    this.FromDynamically();
    console.log('f', this.myForm);
  }
  getDataUser() {
    // Send data request
    this.caseService.getList().subscribe(
      (res: any) => {
        this.DataResponse = res;
        this.userData = res
        console.log('Data :', this.DataResponse);
      },
      (err) => {
      },
      () => {
        // this.filterData();
      }
    );
  }
  open(content: any) {
    this.modalService.open(content, {
      // centered: true,
      size: "lg",
      scrollable: true,
    });
  }
  FromDynamically() {
    this.http.get('/assets/form-config.json')
      .subscribe((formData: any) => {
        this.formData = formData;
        console.log('json', formData);
      });
  }
  filterData() {
    console.log('filter', this.DataResponse)
    console.log('case iter', this.dataCase)
    this.userData = this.DataResponse.filter((data: any) => {
      return data.case_status === this.dataCase?.case_status ||
       data.case_type === this.dataCase?.case_type ||
        data.title === this.dataCase?.title
    });
    console.log("userData", this.userData);
  }

  toggleAccordionFilters(): void {
    if (!this.isAccordionToggledfilter)
      this.isAccordionToggledfilter = false;
    this.isAccordionToggledfilter = !this.isAccordionToggledfilter;
    console.log(this.isAccordionToggledfilter)
  }

}

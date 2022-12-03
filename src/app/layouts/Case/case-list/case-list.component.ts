import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonFormData } from 'src/app/shared/models/dynamically-form/dynamically-form';
import { ServicesService } from 'src/app/shared/services/services.service';
import { Case } from '../models/case';
import { ToastrService } from 'ngx-toastr';
import { CaseService } from '../services/case.service';
@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  @ViewChild("content") content: any;
  isAccordionToggledfilter: boolean = false;
  modelType: boolean = false;
  isLoading: boolean = false;
  formData?: JsonFormData;
  myForm: FormGroup = this.fb.group({});
  dataCase = {} as Case;
  DataResponse: any[] = [];
  userData: any;
  titleModel: any;

  constructor(
    private caseService: CaseService,
    private modalService: NgbModal,
    private http: HttpClient,
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.getData();
    this.getCaseType();
    this.FromDynamically();
    this.servicesService.submittedData.subscribe((form) => {
      this.myForm = form;
      this.onSubmit();
    })
  }
  // get data of case 
  getData() {
    this.caseService.getList().subscribe(
      (res: any) => {
        this.DataResponse = res;
        this.userData = res
      },
      (err) => {
        console.log(err)
      }
    );
  }
  //open model add case 
  open(content: any) {
    this.modelType = false;
    this.myForm.reset();
    this.modalService.open(content, { size: "lg", scrollable: true });
    if (!this.modelType) { this.titleModel = 'Add New Case' }
  }
  //open model edit case and set value service subject
  openEdit(data: any) {
    this.modelType = true;
    this.modalService.open(this.content, { size: "lg", scrollable: true });
    this.myForm.addControl('id', this.fb.control(data.id));
    this.myForm.addControl('case_type', this.fb.control(data.case_type));
    this.myForm.addControl('case_status', this.fb.control(data.case_status));
    this.myForm.addControl('case_status2', this.fb.control(data.case_status2));
    this.myForm.addControl('case_trust', this.fb.control(data.case_trust));
    this.myForm.addControl('case_date', this.fb.control(data.case_date));
    this.myForm.addControl('title', this.fb.control(data.title));
    this.myForm.addControl('case_description', this.fb.control(data.case_description));
    this.servicesService.selectedData.next(this.myForm);
    if (this.modelType == true) {
      this.titleModel = 'Edit Case'
    }
  }
  // get fields from dynamically json file
  FromDynamically() {
    this.http.get('/assets/form-config.json')
      .subscribe((formData: any) => {
        this.formData = formData;
      });
  }
  // Search filters
  filterData() {
    this.isLoading = true;
    this.userData = this.DataResponse.filter((data: any) => {
      this.isLoading = false;
      console.log('this.isLoading' , this.isLoading)
      return data.case_date.toString().includes(this.dataCase?.case_date ?? '') &&
        data.case_type.toString().includes(this.dataCase?.case_type ?? '') &&
        data.title.toString().includes(this.dataCase?.title ?? '')
    });
  }
  // toggle  button  Search filters
  toggleAccordionFilters(): void {
    if (!this.isAccordionToggledfilter)
      this.isAccordionToggledfilter = false;
    this.isAccordionToggledfilter = !this.isAccordionToggledfilter;
  }
  //get case type 
  getCaseType() {
    this.caseService.getCaseType().subscribe(res => {
      this.servicesService.selectedOption.next(res);
    })
  }

  // function add and edit 
  onSubmit() {
   this.isLoading = true;
    if (this.myForm.value.id) {
      this.caseService.UpdateCase(this.myForm.value.id, this.myForm.value).subscribe(
        (res) => {
           this.isLoading = false
          console.log('res update case');
        },
        (error) => {
          console.log('error update case', error)
        },
        () => {
          this.toastr.success('Update case success ');
          this.getData();
          this.modalService.dismissAll("Cross click");
        }

      )
    } else {
      this.caseService.addCase(this.myForm.value).subscribe(
        (res) => {
          console.log('res add case', res);
        },
        (error) => {
          console.log('error add case', error)
        },
        () => {
          this.toastr.success('Add case success ');
          this.getData();
          this.modalService.dismissAll("Cross click");
        }
      )
    }
  }

}

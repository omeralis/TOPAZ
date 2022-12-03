import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonFormData, JsonFormControls } from '../../models/dynamically-form/dynamically-form';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-dynamically-json-form',
  templateUrl: './dynamically-json-form.component.html',
  styleUrls: ['./dynamically-json-form.component.scss']
})
export class DynamicallyJsonFormComponent implements OnInit {
  @Input() jsonFormData?: JsonFormData;
  @Output() form1 = new EventEmitter<FormGroup>();
  myForm: FormGroup = this.fb.group({});
  submitted: boolean = false;
  isLoading: boolean = false;
  const: any;
  option: any;
  jsonFormControls: JsonFormControls[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private servicesService: ServicesService,
  ) {
    this.jsonFormData?.controls.forEach((control: JsonFormControls) => {
      console.log('control', control);
      // this.myForm.addControl(control.name, this.fb.control(''));
      this.jsonFormControls.push(control);
    });
    // this.createForm(this.jsonFormControls);

  }

  ngOnInit(): void {
    this.jsonFormData?.controls.forEach((control: JsonFormControls) => {
      // this.myForm.addControl(control.name, this.fb.control(''));
      this.jsonFormControls.push(control);
    });
    this.createForm(this.jsonFormControls);

    this.servicesService.selectedData.subscribe((res) => {
      console.log('selected', res);
      if (res.value.id) {
        this.myForm = res;
        this.myForm.controls['case_status'].setValue(true);
      } else {
        console.log('not null')
        this.myForm;
      }
    });
    this.getOption();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      console.log(this.jsonFormData);
    }
  }
  onCheckChange(e: any) {
    console.log('e ', e)
    this.myForm.controls['case_status'].setValue(e.currentTarget.checked)
    this.myForm.controls['case_trust'].setValue(e.target.id == 'no' ? false : true)
  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'name':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      this.myForm.addControl(control.name, this.fb.control(control.value, validatorsToAdd));
    }
  }
  getOption() {
    this.servicesService.selectedOption.subscribe(res => {
      this.option = res;
      console.log('opt', this.option)

    })
  }
  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    if (this.myForm.invalid) {
      this.isLoading = false
      return;
    }
    this.servicesService.submittedData.next(this.myForm);
    this.isLoading = false
  }
  colesModel() {
    this.modalService.dismissAll("Cross click");
  }
  submittedValid(controlName: string) {
    return this.myForm.controls[controlName];
  }
}

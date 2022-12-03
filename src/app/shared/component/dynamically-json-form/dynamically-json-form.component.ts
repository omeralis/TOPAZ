import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  JsonFormData,
  JsonFormControls,
} from '../../models/dynamically-form/dynamically-form';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-dynamically-json-form',
  templateUrl: './dynamically-json-form.component.html',
  styleUrls: ['./dynamically-json-form.component.scss'],
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
    private servicesService: ServicesService
  ) {
    this.jsonFormData?.controls.forEach((control: JsonFormControls) => {
      console.log('control', control);
      this.jsonFormControls.push(control);
    });
  }

  ngOnInit(): void {
    this.setData();
    this.createForm(this.jsonFormControls);
    this.setDataEdit();
    this.getOption();
  }
  //push FormControls
  setData() {
    this.jsonFormData?.controls.forEach((control: JsonFormControls) => {
      this.jsonFormControls.push(control);
    });
  }
  //set Data Edit
  setDataEdit() {
    this.servicesService.selectedData.subscribe((res) => {
      if (res.value.id) {
        this.myForm = res;
        this.myForm.controls['case_status'].setValue(true);
      } else {
        console.log('not null');
        this.myForm;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      console.log(this.jsonFormData);
    }
  }
  // push data radio & checkbox to myForm
  onCheckChange(e: any) {
    this.myForm.controls['case_status'].setValue(e.currentTarget.checked);
    this.myForm.controls['case_trust'].setValue(
      e.target.id == 'no' ? false : true
    );
  }
  // add validators
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
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }
  // get data case type
  getOption() {
    this.servicesService.selectedOption.subscribe((res) => {
      this.option = res;
      console.log('opt', this.option);
    });
  }
  // add and edit function
  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    if (this.myForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.servicesService.submittedData.next(this.myForm);
    this.isLoading = false;
  }
  // close model
  colesModel() {
    this.modalService.dismissAll('Cross click');
  }
  // validators
  submittedValid(controlName: string) {
    return this.myForm.controls[controlName];
  }
}

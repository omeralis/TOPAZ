import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaseService } from 'src/app/layouts/case/services/case.service';
import { JsonFormData, JsonFormControls } from '../../models/dynamically-form/dynamically-form';

@Component({
  selector: 'app-dynamically-json-form',
  templateUrl: './dynamically-json-form.component.html',
  styleUrls: ['./dynamically-json-form.component.scss']
})
export class DynamicallyJsonFormComponent implements OnInit {
  @Input() jsonFormData?: JsonFormData;
  @Output() form1 = new EventEmitter<FormGroup>();
  myForm: FormGroup = this.fb.group({});
  const: any;
  constructor(private fb: FormBuilder, private caseService: CaseService) {
    this.jsonFormData?.controls.forEach((control: JsonFormControls) => {
      console.log('control', control);
      this.myForm.addControl(control.name, this.fb.control(''));
    });

  }

  ngOnInit(): void {
    this.jsonFormData?.controls.forEach((control: JsonFormControls) => {
      console.log('control', control);
      this.myForm.addControl(control.name, this.fb.control(''));
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      console.log(this.jsonFormData);
    }
  }
  onCheckChange(e: any) {
    console.log('e ', e.currentTarget.checked)
    this.myForm.controls['case_status'].setValue(e.currentTarget.checked)
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
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
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
  onSubmit() {
    this.caseService.addList(this.myForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error)
      }
    )
    // console.log('Form valid: ', this.myForm.valid);
    // console.log('Form values: ', this.myForm.value);
  }
}

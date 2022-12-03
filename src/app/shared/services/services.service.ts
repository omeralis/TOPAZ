import { Injectable, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  public selectedData = new BehaviorSubject<FormGroup>(new FormGroup({}));
  public selectedOption = new BehaviorSubject<any>(null);
  public submittedData = new Subject<FormGroup>();
  constructor() { }

}

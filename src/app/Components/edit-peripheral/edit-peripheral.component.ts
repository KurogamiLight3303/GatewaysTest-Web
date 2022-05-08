import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EndpointService } from 'src/app/Services/endpoint.service';
import { PeripheralService } from 'src/app/Services/peripheral.service';
import { ToastMessagesService } from 'src/app/Services/toast-messages.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-peripheral',
  templateUrl: './edit-peripheral.component.html',
  styleUrls: ['./edit-peripheral.component.scss']
})
export class EditPeripheralComponent implements OnInit {
  public peripheralService: PeripheralService;
  private serialNo: string = "";
  isLoading = false;
  subscriptions: Subscription[] = [];

  peripheralForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    public modal: NgbActiveModal, 
    private endpointService: EndpointService, 
    private toasService: ToastMessagesService, 
    public translate: TranslateService
    ) { 
    this.peripheralService = new PeripheralService(this.endpointService, this.serialNo);
    this.peripheralForm = this.fb.group({
      uid: ['', Validators.required],
      vendor: ['', Validators.required],
      fabricationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  setSerialNo(serialNo: string){
    this.serialNo = serialNo;
    this.peripheralService = new PeripheralService(this.endpointService, this.serialNo);
    this.peripheralService.errorMessage$.subscribe(textOrTpl => {
      this.toasService.showMessage(textOrTpl);
    });
  }

  isControlValid(controlName: string): boolean {
    const control = this.peripheralForm.controls[controlName];
    return control.valid && (control.dirty || control.touched) && control.value != '';
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.peripheralForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation : any, controlName: string): boolean {
    const control = this.peripheralForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  save(){
    const task = this.peripheralService.add(this.peripheralForm.value);
    task.toPromise().then((res) => {
      if(res)
        this.modal.close(res);
    });
  }
}

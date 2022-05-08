import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GatewayModel } from 'src/app/models/gateway.model';
import { GatewaysService } from 'src/app/Services/gateways.service';

@Component({
  selector: 'app-edit-gateway',
  templateUrl: './edit-gateway.component.html',
  styleUrls: ['./edit-gateway.component.scss']
})
export class EditGatewayComponent implements OnInit {
  private SerialNo: string = ``;
  isLoading = false;
  subscriptions: Subscription[] = [];

  gatewayForm: FormGroup;

  get isEdit() {
    return this.SerialNo.length > 0;
  }

  constructor(private fb: FormBuilder, public gatewayService: GatewaysService, public modal: NgbActiveModal) {
    this.gatewayForm = this.fb.group({
      name: ['', Validators.required],
      ipAddress: ['', Validators.required],
      serialNo: ['']
    });
   }

  ngOnInit(): void {
  }

  setSource(gateway: GatewayModel) : void{
    this.SerialNo = gateway.serialNo;
    this.gatewayForm.controls["serialNo"].setValue(gateway.serialNo);
    this.gatewayForm.controls["name"].setValue(gateway.name);
    this.gatewayForm.controls["ipAddress"].setValue(gateway.ipAddress);
  }
  
  isControlValid(controlName: string): boolean {
    const control = this.gatewayForm.controls[controlName];
    return control.valid && (control.dirty || control.touched) && control.value != '';
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.gatewayForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation : any, controlName: string): boolean {
    const control = this.gatewayForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  save(){
    var task;
    if(this.isEdit){
      task = this.gatewayService.update(this.SerialNo, this.gatewayForm.value);
    }else{
      task = this.gatewayService.add(this.gatewayForm.value);
    }
    task.toPromise().then((res) => {
      if(res)
        this.modal.close(res);
    });
  }
}

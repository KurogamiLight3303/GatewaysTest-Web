import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

  public Messages: any[] = [];
  constructor() { }

  showMessage(textOrTpl: string, type: string = "danger"){
    if(textOrTpl && textOrTpl.length > 0)
    {
      this.Messages.push({ textOrTpl, classname: `bg-${type} text-light`, delay: 5000 });
    }
  }
  hideMessage(message: any){
    this.Messages = this.Messages.filter(t => t !== message);
  }
}

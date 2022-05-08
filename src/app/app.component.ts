import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GatewaysTest-Web';

  constructor(public translate: TranslateService){
    var lang = translate.getBrowserLang();
    if(lang == undefined)
      lang = 'en';
    translate.use(lang);
  }
}

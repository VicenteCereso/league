import { Injectable } from '@angular/core';
import{ ToastrService} from 'ngx-toastr'
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toast:ToastrService) { }

  showSucess(text,title){
    this.toast.success(text,title);
  }

  showError(text,title){
    this.toast.error(text,title);
  }
}

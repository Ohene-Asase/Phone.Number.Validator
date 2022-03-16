import { Injectable } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSucess(message: string, title?: string){
  this.toastr.success(message,title)
  }

  showErrow(message?: string, title?: string){
  this.toastr.error(message,title, {timeOut:0, extendedTimeOut:0})
  }
}

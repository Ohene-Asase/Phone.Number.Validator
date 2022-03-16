import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-details',
  templateUrl: './number-details.component.html',
  styleUrls: ['./number-details.component.scss']
})
export class NumberDetailsComponent implements OnInit {
 details: any


  constructor() { }

  ngOnInit(): void {
    const data = localStorage.getItem('details')
    if (data) this.details = JSON.parse(data);
   console.log(this.details)
  }

}

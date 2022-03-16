import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumberDetailsRoutingModule } from './number-details-routing.module';
import { NumberDetailsComponent } from './number-details.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    NumberDetailsComponent
  ],
  imports: [
    CommonModule,
    NumberDetailsRoutingModule,
    SharedModule
  ]
})
export class NumberDetailsModule { }

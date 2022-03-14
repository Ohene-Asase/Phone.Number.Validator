import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { Country } from 'src/app/models/validation.model';
import { NumberValidatorService } from 'src/app/services/number-validator.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  validatorForm: FormGroup = new FormGroup({});
  subscriptions: Subscription[] = [];
  countries: any;
  staticCountries?: Country[] = [];
  filteredSupportedCountries?: Country[] = [];
  allCountries?: Country[] = [];
  supportedCountriesObject: any;

  constructor(private fb: FormBuilder,
              private phoneService: NumberValidatorService
    ) { }

  ngOnInit(): void {
    this.setupForm();
    // this.fetchCountries();
    // this.fetchSupportedCountries();
    this.fetchCountries();
    
  }
 

  sendPhoneNumberForValidation(param: any): void{
    this.phoneService.verifyNumber(param)
    .subscribe((data)=> {
      let results = data
    })

   console.log(param.number);
 
  }

  fetchCountries(): void{
   this.subscriptions.push(
    forkJoin([
      this.phoneService.getCountries(),
       this.phoneService.getSupportedCountries(),
    ]).subscribe((res)=> {
     console.log(res);
     this.allCountries = res[0];
     this.supportedCountriesObject = res[1];
     this.getSupportedCountries();
     
     

    },
    (error) => {
      console.error('error occurred', error)
    }
    )
    
   )
  }


  getSupportedCountries(): void{
    const supportedCountries = Object.keys(this.supportedCountriesObject);
    console.log(supportedCountries)
    this.filteredSupportedCountries = this.allCountries?.filter((country: any)=> 
      supportedCountries.some((s)=> s===country.alpha2Code)
    );
    console.log(this.filteredSupportedCountries)
    this.staticCountries = this.filteredSupportedCountries
    
  }


  setupForm(): void{
    this.validatorForm = this.fb.group({
     number: new FormControl(''),
     country_code: new FormControl('', [Validators.required])
    })
  }

  ngOnDestroy(): void {
  this.subscriptions.forEach(subscription => subscription.unsubscribe) 
}

}

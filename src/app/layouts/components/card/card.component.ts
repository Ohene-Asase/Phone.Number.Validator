import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Country } from 'src/app/models/validation.model';
import { NotificationService } from 'src/app/services/notification.service';
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
  countriess: any
  constructor(private fb: FormBuilder,
              private phoneService: NumberValidatorService,
              private toaster: NotificationService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.setupForm();
    // this.fetchCountries();
    // this.fetchSupportedCountries();
    this.fetchCountries();
    this.getCountries();
    
  }
 
  getCountries(){
  this.countriess = this.phoneService.get().subscribe((data) => {
    this.countriess = data
    console.log(this.countriess)
  })
 
  }
  sendPhoneNumberForValidation(param: any): void{
    this.phoneService.verifyNumber(param)
    .subscribe((data)=> {
       let results = data
      if(results.valid){
        this.toaster.showSucess('Number is Valid') 
        this.goToDetails(results)
      }
      else{
        results.error? this.toaster.showErrow(results.error?.info): this.toaster.showErrow('Number is invalid');
      }
    })
  }

  goToDetails(res: any): void{
    localStorage.setItem('details', JSON.stringify(res))
    this.router.navigate(["number-details"])
  }

  fetchCountries(): void{
   this.subscriptions.push(
    forkJoin([
      this.phoneService.getCountries(),
       this.phoneService.get(),
    ]).subscribe((res)=> {
    //  console.log(res);
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
    this.filteredSupportedCountries = this.allCountries?.filter((country: any)=> 
      supportedCountries.some((s)=> s===country.alpha2Code)
    );
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

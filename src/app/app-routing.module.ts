import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    loadChildren: () => import('./layouts/components/home/home.module').then((m) => m.HomeModule)
  },
  { path: 'number-details', loadChildren: () => import('./layouts/pages/number-details/number-details.module').then(m => m.NumberDetailsModule) }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

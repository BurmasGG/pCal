import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './home-view/home-view.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { NextWeekComponent } from './next-week/next-week.component';
import { PrevWeekComponent } from './prev-week/prev-week.component';


const routes: Routes = [{path: '', component: HomeViewComponent},
    {path: 'month', component: MonthViewComponent },
    {path: 'home', component: MonthViewComponent},
    {path: 'makeAppointment', component: NewAppointmentComponent},
    {path: 'nextWeek', component: NextWeekComponent},
    {path: 'prevWeek' , component: PrevWeekComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

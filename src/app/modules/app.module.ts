import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import {LoginComponent} from '../components/login/login.component';
import { HeaderComponent } from '../components/header/header.component';
import { TaskComponent } from '../components/task/task.component';
import { DeleteTaskComponent } from '../components/dialogs/task/delete/delete-task.component';
import {ActionComponent} from '../components/dialogs/task/action/action.component';
import { ProfileComponent } from '../components/dialogs/profile/profile.component';
import {LoginService} from '../services/login.service';
import {MaterialModule} from './material.module';

const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [LoginService]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'dashboard'}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    TaskComponent,
    ActionComponent,
    DeleteTaskComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes, { useHash: true }
    ),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileComponent,
    DeleteTaskComponent,
    ActionComponent
  ]
})
export class AppModule { }

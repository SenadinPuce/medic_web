import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { adminGuard } from './guard/admin.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [adminGuard]},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

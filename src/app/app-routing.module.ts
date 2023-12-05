import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImoveisComponent } from 'src/app/pages/imoveis/imoveis.component';

const routes: Routes = [
  { path: '', redirectTo: '/imoveis', pathMatch: 'full' },
  { path: 'imoveis', component: ImoveisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

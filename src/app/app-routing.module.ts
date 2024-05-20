import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./public/pages/login/login.component";
import {FindHouseComponent} from "./public/pages/main-content-keeper/busqueda/find-house.component";
import {MessengerKeeperComponent} from "./public/pages/main-content-keeper/messenger-keeper/messenger-keeper.component";
import {ProfileKeeperComponent} from "./public/pages/main-content-keeper/profile-keeper/profile-keeper.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {KeeperComponent} from "./public/pages/main-content-keeper/Home/keeper.component";
import {CarnesComponent} from "./public/pages/Categorias/carnes/carnes.component";
import {VerdurasComponent} from "./public/pages/Categorias/verduras/verduras.component";
import {FrutasComponent} from "./public/pages/Categorias/frutas/frutas.component";
import {LacteosComponent} from "./public/pages/Categorias/lacteos/lacteos.component";
import {PanisteriaComponent} from "./public/pages/Categorias/panisteria/panisteria.component";
import {AbarrotesComponent} from "./public/pages/Categorias/abarrotes/abarrotes.component";
import {ComidasComponent} from "./public/pages/Categorias/comidas/comidas.component";
import {AddDataTableComponent} from "./public/pages/add-data-table/add-data-table.component";
import {LogeoComponent} from "./public/registross/logeo/logeo.component";
import {DialogLogComponent} from "./public/dialog-log/dialog-log.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home-client', component: KeeperComponent},
  {path: 'verduras', component: VerdurasComponent},
  {path: 'carnes', component: CarnesComponent},
  {path: 'frutas', component: FrutasComponent},
  {path: 'abarrotes', component: AbarrotesComponent},
  {path: 'lacteos', component: LacteosComponent},
  {path: 'panisteria', component: PanisteriaComponent},
  {path: 'comida', component: ComidasComponent},

  {path: 'find-house', component: FindHouseComponent},
  {path: 'messenger-client', component: MessengerKeeperComponent},
  {path: 'card', component: AddDataTableComponent},
  {path: 'profile-client', component: ProfileKeeperComponent},
  { path: 'sign-in', component : LogeoComponent  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component:PageNotFoundComponent},

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

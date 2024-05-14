import {HostListener, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './public/pages/login/login.component';
import {FindHouseComponent} from "./public/pages/main-content-keeper/busqueda/find-house.component";
import {MessengerKeeperComponent} from "./public/pages/main-content-keeper/messenger-keeper/messenger-keeper.component";
import {ProfileKeeperComponent} from "./public/pages/main-content-keeper/profile-keeper/profile-keeper.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {KeeperComponent} from './public/pages/main-content-keeper/Home/keeper.component';

import { UpdateProfileComponent } from './public/pages/update-profile/update-profile.component';

import { FindKeeperComponent } from './public/pages/main-content-traveler/find-keeper/find-keeper.component';
import { MessengerTravelerComponent } from './public/pages/main-content-traveler/messenger-traveler/messenger-traveler.component';
import { ProfileTravelerComponent } from './public/pages/main-content-traveler/profile-traveler/profile-traveler.component';
import { TravelerComponent } from './public/pages/main-content-traveler/traveler/traveler.component';
import { SigninComponent } from './public/pages/signin/signin.component';
import { RegisterClientComponent } from './public/pages/register-user/register-client/register-client.component';
import { RegisterAdminComponent } from './public/pages/register-user/register-admin/register-admin.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { LogeoComponent } from './public/registross/logeo/logeo.component';
import { RegistroComponent } from './public/registross/registro/registro.component';
import { TelephoneComponent } from './public/registross/telephone/telephone.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { DialogLogComponent } from './public/dialog-log/dialog-log.component';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { CarrucelComponent } from './public/carrucel/carrucel.component';
import { LacteosComponent } from './public/pages/Categorias/lacteos/lacteos.component';
import { CarnesComponent } from './public/pages/Categorias/carnes/carnes.component';
import { VerdurasComponent } from './public/pages/Categorias/verduras/verduras.component';
import { FrutasComponent } from './public/pages/Categorias/frutas/frutas.component';
import { PanisteriaComponent } from './public/pages/Categorias/panisteria/panisteria.component';
import { AbarrotesComponent } from './public/pages/Categorias/abarrotes/abarrotes.component';
import { ComidasComponent } from './public/pages/Categorias/comidas/comidas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FindHouseComponent,
    MessengerKeeperComponent,
    ProfileKeeperComponent,
    PageNotFoundComponent,
    KeeperComponent,
    UpdateProfileComponent,
    MessengerTravelerComponent,
    ProfileTravelerComponent,
    SigninComponent,
    RegisterClientComponent,
    RegisterAdminComponent,
    LogeoComponent,
    RegistroComponent,
    FindKeeperComponent,
    TravelerComponent,
    TelephoneComponent,
    DialogLogComponent,
    CarrucelComponent,
    LacteosComponent,
    CarnesComponent,
    VerdurasComponent,
    FrutasComponent,
    PanisteriaComponent,
    AbarrotesComponent,
    ComidasComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatSidenavModule,
    MatDialogModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

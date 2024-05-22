import {HostListener, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './public/pages/login/login.component';
import {MessengerKeeperComponent} from "./public/pages/main-content-keeper/messenger-keeper/messenger-keeper.component";
import {ProfileKeeperComponent} from "./public/pages/main-content-keeper/profile-keeper/profile-keeper.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {KeeperComponent} from './public/pages/main-content-keeper/Home/keeper.component';
import { UpdateProfileComponent } from './public/pages/update-profile/update-profile.component';
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
import {MatTooltipModule} from "@angular/material/tooltip";

import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { LacteosComponent } from './public/pages/Categorias/lacteos/lacteos.component';
import { CarnesComponent } from './public/pages/Categorias/carnes/carnes.component';
import { VerdurasComponent } from './public/pages/Categorias/verduras/verduras.component';
import { FrutasComponent } from './public/pages/Categorias/frutas/frutas.component';
import { PanisteriaComponent } from './public/pages/Categorias/panisteria/panisteria.component';
import { AbarrotesComponent } from './public/pages/Categorias/abarrotes/abarrotes.component';
import { ComidasComponent } from './public/pages/Categorias/comidas/comidas.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AddDataTableComponent} from "./public/pages/add-data-table/add-data-table.component";
import {LogeoComponent} from "./public/registross/logeo/logeo.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessengerKeeperComponent,
    ProfileKeeperComponent,
    PageNotFoundComponent,
    KeeperComponent,
    UpdateProfileComponent,
    LacteosComponent,
    CarnesComponent,
    VerdurasComponent,
    FrutasComponent,
    PanisteriaComponent,
    AbarrotesComponent,
    ComidasComponent,
    AddDataTableComponent,
    LogeoComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
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
    ///////
    MatButtonToggleModule,
    MatCheckboxModule,
    MatTableModule,
    MatDatepickerModule,


  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

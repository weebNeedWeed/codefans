import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './layouts/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { BoxComponent } from './components/box/box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { LocaleDatePipe } from './pipes/locale-date.pipe';
import { FooterComponent } from './layouts/footer/footer.component';
import { ProgressBarComponent } from './layouts/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    routingComponents,
    BoxComponent,
    CardComponent,
    LocaleDatePipe,
    FooterComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

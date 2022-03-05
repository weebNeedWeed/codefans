import { GridBoxComponent } from './components/grid-box/grid-box.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AppIconsModule } from './app-icons.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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
import { LayoutModule } from '@angular/cdk/layout';
import { MobileNavComponent } from './layouts/mobile-nav/mobile-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    routingComponents,
    BoxComponent,
    CardComponent,
    LocaleDatePipe,
    SafeHtmlPipe,
    FooterComponent,
    ProgressBarComponent,
    MobileNavComponent,
    GridBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    AppIconsModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

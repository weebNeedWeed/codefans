import { NgModule } from '@angular/core';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { ArrowClockwise } from 'ng-bootstrap-icons/icons';

const icons = { ArrowClockwise };

@NgModule({
  imports: [BootstrapIconsModule.pick(icons)],
  exports: [BootstrapIconsModule],
})
export class IconsModule {}

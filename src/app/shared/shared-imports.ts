import {NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DatePipe, I18nPipe } from '@delon/theme';

import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import {NzUploadModule} from "ng-zorro-antd/upload";

export const SHARED_IMPORTS = [
  FormsModule,
  ReactiveFormsModule,
  RouterLink,
  NgTemplateOutlet,
  NgClass,
  NgIf,
  NgFor,
  NgStyle,
  I18nPipe,
  DatePipe,
  ...SHARED_DELON_MODULES,
  ...SHARED_ZORRO_MODULES
];

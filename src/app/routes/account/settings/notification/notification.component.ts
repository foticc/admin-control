import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SHARED_IMPORTS } from '@shared';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-account-settings-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  imports: [...SHARED_IMPORTS, NzListModule, NzSwitchModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSettingsNotificationComponent {
  i: {
    password: boolean;
    messages: boolean;
    todo: boolean;
  } = {
    password: true,
    messages: true,
    todo: true
  };
}

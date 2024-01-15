import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-binding',
  standalone: true,
  templateUrl: './binding.component.html',
  imports: [NzListModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSettingsBindingComponent {
  constructor(public msg: NzMessageService) {}
}

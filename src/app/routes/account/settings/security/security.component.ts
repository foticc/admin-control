import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzListComponent, NzListItemComponent, NzListItemMetaComponent } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-settings-security',
  standalone: true,
  templateUrl: './security.component.html',
  imports: [NzListItemMetaComponent, NzListItemComponent, NzListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSettingsSecurityComponent {
  constructor(public msg: NzMessageService) {}
}

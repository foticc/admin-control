import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, RouterOutlet } from '@angular/router';
import { SHARED_IMPORTS } from '@shared';
import { NzMenuModeType } from 'ng-zorro-antd/menu';
import { debounceTime, filter, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  imports: [...SHARED_IMPORTS, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSettingsComponent implements AfterViewInit, OnDestroy {
  private resize$!: Subscription;
  private router$: Subscription;
  mode: NzMenuModeType = 'inline';
  title!: string;
  menus: Array<{ key: string; title: string; selected?: boolean }> = [
    {
      key: 'base',
      title: '基本设置'
    },
    {
      key: 'security',
      title: '安全设置'
    },
    {
      key: 'binding',
      title: '账号绑定'
    },
    {
      key: 'notification',
      title: '新消息通知'
    }
  ];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private el: ElementRef<HTMLElement>
  ) {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
  }

  private setActive(): void {
    const key = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.menus.forEach(i => {
      i.selected = i.key === key;
    });
    this.title = this.menus.find(w => w.selected)!.title;
  }

  to(item: { key: string }): void {
    this.router.navigateByUrl(`/account/${item.key}`);
  }

  private resize(): void {
    const el = this.el.nativeElement;
    let mode: NzMenuModeType = 'inline';
    const { offsetWidth } = el;
    if (offsetWidth < 641 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    this.mode = mode;
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.resize());
    this.setActive();
  }

  ngOnDestroy(): void {
    this.resize$.unsubscribe();
    this.router$.unsubscribe();
  }
}

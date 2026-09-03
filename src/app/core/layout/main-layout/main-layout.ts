import {Component, HostListener, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AuthStore} from '../../../features/auth/stores/auth.store';
import {RolePipe} from '../../../shared/pipes/role.pipe';
import {Badge} from '../../../shared/components/badge/badge';
import {filter} from 'rxjs';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    RolePipe,
    Badge,
    TitleCasePipe
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly isMobile = signal(window.innerWidth < 900);

  protected readonly user = this.authStore.user;

  constructor() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        if (this.isMobile()) {

          window.scrollTo({top: 0, behavior: 'instant'});
        }
      });
  }

  @HostListener('window:resize')
  onResize(): void {

    this.isMobile.set(window.innerWidth < 900);
  }

  closeMenuOnMobile(sidenav: MatSidenav): void {

    if (this.isMobile()) {

      sidenav.close();
    }
  }

  protected logout(): void {

    this.authStore.logout();
    this.router.navigate(['/']);
  }

}

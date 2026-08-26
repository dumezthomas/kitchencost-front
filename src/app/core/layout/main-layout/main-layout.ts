import {Component, computed, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AuthStore} from '../../../features/auth/stores/auth.store';
import {RolePipe} from '../../../shared/pipes/role.pipe';

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
    RolePipe
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly user = this.authStore.user;

  protected readonly pageTitle = computed(() => {

    const url = this.router.url;

    if (url.startsWith('/ingredients')) return 'Ingredients';
    if (url.startsWith('/recipes')) return 'Recipes';
    if (url.startsWith('/menu-items')) return 'Menu Items';
    if (url.startsWith('/settings')) return 'Settings';

    return 'Dashboard';
  });

  protected logout(): void {

    this.authStore.logout();
    this.router.navigate(['/']);
  }

}

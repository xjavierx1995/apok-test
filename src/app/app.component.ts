import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NodeService } from './services/node.service';
import { Store } from '@ngrx/store';
import { setLocalesList } from './store/locale/locale.action';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private nodeService: NodeService,
    private store: Store
    ) {
    this.initApp();
  }

  initApp(){
    this.nodeService.getLocales().subscribe(locales => {
      this.store.dispatch(setLocalesList({ locales }));
    });
    this.router.navigate(['/home']);
  }
}

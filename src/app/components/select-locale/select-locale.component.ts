import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setSelectedLocale } from 'src/app/store/locale/locale.action';
import { Ilocale } from 'src/app/store/locale/locale.state';

@Component({
  selector: 'app-select-locale',
  styleUrls: ['./select-locale.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  template: `
    <ion-list>
      <ion-item>
        <ion-select [compareWith]="compareWith" [(ngModel)]="selectedLocale" 
          (ionChange)="selectLocale()">
          <ion-select-option *ngFor="let item of localeList" [value]="item">
            {{ item.label }}
          </ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
  `
})
export class SelectLocaleComponent  implements OnInit {

  selectedLocale: Ilocale;
  localeList: Ilocale[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('locale').subscribe( locale => {
      this.selectedLocale = locale.selectedLocale;
      this.localeList = locale.localeList;      
    });
  }

  selectLocale(){
    this.store.dispatch(setSelectedLocale({ locale: this.selectedLocale }));
  }

  compareWith(o1: Ilocale, o2: Ilocale) {
    return o1 && o2 ? o1.locale === o2.locale : o1 === o2;
  }

}

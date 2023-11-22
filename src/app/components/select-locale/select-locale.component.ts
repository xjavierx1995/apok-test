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
  templateUrl: './select-locale.component.html',
  styleUrls: ['./select-locale.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
})
export class SelectLocaleComponent  implements OnInit {

  selectedLocale: Ilocale;
  localeList: Ilocale[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('locale').subscribe( locale => {
      this.selectedLocale = locale.selectedLocale;
      this.localeList = locale.localeList;
      console.log(this.selectedLocale);
      
    });
  }

  selectLocale(){
    this.store.dispatch(setSelectedLocale({ locale: this.selectedLocale }));
  }

  compareWith(o1: Ilocale, o2: Ilocale) {
    return o1 && o2 ? o1.locale === o2.locale : o1 === o2;
  }

}

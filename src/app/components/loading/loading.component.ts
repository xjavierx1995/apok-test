import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  styleUrls: ['./loading.component.scss'],
  template: `
    <ion-card class="ion-padding">
      <div class="img-container">
        <img src="assets/svg/search.svg">
      </div>
      <ion-card-title>Cargando contenido...</ion-card-title>
    </ion-card>
  `,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class LoadingComponent {

}

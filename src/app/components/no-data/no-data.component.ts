import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-no-data',
  styleUrls: ['./no-data.component.scss'],
  template: `
    <ion-card class="ion-padding">
      <div class="img-container">
        <img src="assets/svg/data.svg">
      </div>
      <ion-card-title>Sin contenido</ion-card-title>
    </ion-card>
  `,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class NoDataComponent {

}

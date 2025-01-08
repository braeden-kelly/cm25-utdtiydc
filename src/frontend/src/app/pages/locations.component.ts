import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-locations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <h2 class="text-2xl font-extrabold text-accent">
        Hypertheory Training Locations
      </h2>
    </div>
  `,
  styles: ``,
})
export class LocationsComponent {}

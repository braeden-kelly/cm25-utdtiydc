import {
  ChangeDetectionStrategy,
  Component,
  resource
} from '@angular/core';

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
    @if (locationsResource.isLoading()) {
      <p>Loading your data</p>
    } @else {
      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-8">
        @for (location of locationsResource.value(); track location.id) {
          <div class="card card-bordered backdrop-brightness-150">
            <div class="card-body">
              <p class="card-title text-secondary">{{ location.name }}</p>
              <div class="font-light pl-4">
                @let address = location.address;
                <p>{{ address.street }}</p>
                <p>{{ address.city }}, {{ address.state }} {{ address.zip }}</p>
                <p>(216) 555-1212</p>
              </div>
              @if (location.note) {
                <div class="font-extralight italic">
                  <p>
                    {{ location.note }}
                  </p>
                </div>
              }
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: ``,
})
export class LocationsComponent {
  locationsResource = resource({
    loader: () =>
      fetch('https://api.hypertheory.com/locations').then((r) => r.json()),
  });
}

import { ChangeDetectionStrategy, Component, resource } from '@angular/core';
import { ErrorAlertComponent } from '../components/error-alert.component';
import { LocationResponseItem } from './types';

@Component({
  selector: 'app-locations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErrorAlertComponent],
  template: `
    <h2 class="text-2xl text-fuchsia-500 p-8">
      Hypertheory Training Locations
    </h2>
    @if (locations.error()) {
      <app-error-alert message="Can't get the locations now. Sorry." />
    }
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      @if (locations.isLoading()) {
        @for (g of [1, 2, 3, 4, 5, 6]; track $index) {
          <div class="card card-bordered backdrop-blur-lg">
            <div class="flex card-body flex-col gap-4">
              <div class="skeleton h-8 w-full"></div>
              <div class="skeleton h-4 w-full"></div>
              <div class="skeleton h-4 w-full"></div>
            </div>
          </div>
        }
      }
      @if (locations.hasValue()) {
        @for (location of locations.value(); track location.id) {
          <div class="card card-bordered backdrop-brightness-150">
            <div class="card-body">
              <p class="card-title text-accent">
                {{ location.name }}
              </p>

              <div class="font-light pl-4">
                <p>{{ location.address.street }}</p>
                <p>
                  {{ location.address.city }}, {{ location.address.state }}
                  {{ location.address.zip }}
                </p>
                @if (location.description) {
                  <p class="font-extralight text-sm italic">
                    {{ location.description }}
                  </p>
                } @else {
                  <p></p>
                }
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: ``,
})
export class LocationsComponent {
  locations = resource<LocationResponseItem[], unknown>({
    loader: () =>
      fetch('https://api.hypertheory.com/locations').then((r) => r.json()),
  });
}

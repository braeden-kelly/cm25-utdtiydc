import {
  Component,
  ChangeDetectionStrategy,
  signal,
  resource,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrainingLocationModel } from './types';
@Component({
  selector: 'app-location-lookup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <p>Location Lookup</p>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-control w-1/3">
        <label for="id" class="label">
          Location ID:
          <input
            type="number"
            class="input input-bordered"
            formControlName="id"
          />
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Get Location</button>
    </form>
    <div class="mt-12">
      @if (locationResource.hasValue()) {
        @let location = locationResource.value()!;
        <div>
          <p class="text-2xl">{{ location.name }}</p>
          <p>
            {{ location.address.street }}, {{ location.address.city }}
            {{ location.address.state }} {{ location.address.zip }}
          </p>
        </div>
      }

      @if (locationResource.isLoading()) {
        <div class="flex w-52 flex-col gap-4">
          <div class="skeleton h-4 w-28"></div>
          <div class="skeleton h-4 w-40"></div>
        </div>
      }

      @if (locationResource.error()) {
        <div class="alert alert-warning">
          <p>No Location With That Id {{ locationResource.error() }}</p>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class LocationLookupComponent {
  form = new FormGroup({
    id: new FormControl<number | undefined>(undefined, {
      validators: Validators.required,
    }),
  });

  id = signal<number | undefined>(undefined);

  locationResource = resource({
    request: () => this.id(),
    loader: async ({ request, abortSignal }) => {
      const r = await fetch(
        `https://api.hypertheory.com/locations/${request}`,
        {
          signal: abortSignal,
        },
      );
      if (r.ok) {
        return r.json() as Promise<TrainingLocationModel>;
      } else {
        throw r.status;
      }
    },
  });

  submit() {
    if (this.form.valid) {
      this.id.set(this.form.controls.id.value ?? undefined);
    }
  }
}

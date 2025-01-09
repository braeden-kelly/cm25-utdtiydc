import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    @if (this.adding() === false) {
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="form-control">
          <label for="name">
            <div class="label">
              <span class="label-text">Name of Location</span>
            </div>
            <input
              type="text"
              class="input input-primary"
              formControlName="name"
            />
          </label>
        </div>
        <div class="form-control">
          <label for="phone">
            <div class="label">
              <span class="label-text">Phone Number</span>
            </div>
            <input
              type="text"
              class="input input-primary"
              formControlName="phone"
            />
          </label>
        </div>
        <div class="form-control">
          <label for="note">
            <div class="label">
              <span class="label-text">Optional Note</span>
            </div>
            <textarea
              type="text"
              class="input input-primary"
              formControlName="note"
            ></textarea>
          </label>
        </div>
        <fieldset
          class="p-4 border-2 border-slate-500 mt-8"
          formGroupName="address"
        >
          <legend>Address</legend>
          <div class="form-control">
            <label for="street">
              <div class="label"><span class="label-text">Street</span></div>
              <input
                type="text"
                class="input input-primary"
                formControlName="street"
              />
            </label>
          </div>
          <div class="form-control">
            <label for="city">
              <div class="label"><span class="label-text">City</span></div>
              <input
                type="text"
                class="input input-primary"
                formControlName="city"
              />
            </label>
          </div>
          <div class="form-control">
            <label for="state">
              <div class="label"><span class="label-text">State</span></div>
              <input
                type="text"
                class="input input-primary"
                formControlName="state"
              />
            </label>
          </div>
          <div class="form-control">
            <label for="zip">
              <div class="label"><span class="label-text">Zip</span></div>
              <input
                type="text"
                class="input input-primary"
                formControlName="zip"
              />
            </label>
          </div>
        </fieldset>
        <button type="submit" class="btn btn-primary">Add Location</button>
      </form>
    } @else {
      <div class="alert alert-info"><p>Adding Your Location</p></div>
    }
  `,
  styles: ``,
})
export class LocationAddComponent {
  #http = inject(HttpClient);
  #destroyRef = inject(DestroyRef);
  adding = signal(false);
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    note: new FormControl(''),
    address: new FormGroup({
      street: new FormControl('', { nonNullable: true }),
      city: new FormControl('', { nonNullable: true }),
      state: new FormControl('', { nonNullable: true }),
      zip: new FormControl('', { nonNullable: true }),
    }),
  });

  submit() {
    this.adding.set(true);
    this.#http
      .post('https://api.hypertheory.com/locations', this.form.value)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.form.reset();
        this.adding.set(false);
      });
  }
}

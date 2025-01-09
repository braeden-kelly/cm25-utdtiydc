import { delay, http, HttpResponse } from 'msw';
import {
  TrainingLocationCreateModel,
  TrainingLocationModel,
} from '../app/pages/types';

const locations: TrainingLocationModel[] = [
  {
    id: '1',
    name: 'HT World Headquarts',
    address: {
      street: '888 Bluebird Court',
      state: 'OH',
      city: 'Cleveland',
      zip: '44319',
    },
    phone: '(888) 999-1212',
  },
  {
    id: '2',
    name: 'Winter Headquarters',
    address: {
      street: '19 Furenza Pl.',
      state: 'FL',
      city: 'Miami',
      zip: '99999',
    },
    phone: '(888) 999-3333',
    note: 'Between the months of November and May',
  },
  {
    id: '3',
    name: 'Mall Popup',
    address: {
      street: '22 Summit Rd',
      state: 'OH',
      city: 'Akron',
      zip: '44319',
    },
    phone: '(216) 555-1818',
    note: 'Summit Mall Popup Location',
  },
  {
    id: '4',
    name: 'Wilderness Center',
    address: {
      street: '2233 Canyon Blvd',
      state: 'CO',
      city: 'Boulder',
      zip: '80623',
    },
    phone: '(444) 555-1818',
    note: 'Above the Treeline',
  },
];
export const LocationsHandler = [
  http.get('https://api.hypertheory.com/locations', async () => {
    return HttpResponse.json(locations);
  }),
  http.get('https://api.hypertheory.com/locations/:id', async ({ params }) => {
    await delay(3000);

    const id = params['id'];
    const location = locations.find((l) => l.id === id);
    if (location) {
      return HttpResponse.json(location);
    } else {
      return new HttpResponse(null, { status: 404 });
    }
  }),
  http.post('https://api.hypertheory.com/locations', async ({ request }) => {
    const body =
      (await request.json()) as unknown as TrainingLocationCreateModel;

    const location: TrainingLocationModel = {
      id: crypto.randomUUID(),
      ...body,
    };
    locations.push(location);
    await delay();
    return HttpResponse.json(location);
  }),
];

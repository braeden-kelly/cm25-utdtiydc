import { http, delay, HttpResponse } from 'msw';
import { LocationResponseItem } from '../app/pages/types';

const locations: LocationResponseItem[] = [
  {
    id: '1',
    name: 'World Headquarters',
    address: {
      street: '1515 Mockingbird Ct',
      city: 'Lakewood',
      state: 'OH',
      zip: '44107',
    },
  },
  {
    id: '2',
    name: 'Winter Headquarters',
    address: {
      street: '1087 Bluebird Court',
      city: 'Honolulu',
      state: 'HI',
      zip: '66107',
    },
  },
  {
    id: '3',
    name: 'Texas Training Center',
    description: 'In the Strip Mall',
    address: {
      street: '888 Superior Blvd',
      city: 'Austin',
      state: 'TX',
      zip: '98900',
    },
  },
  {
    id: '4',
    name: 'Sedona Training and Crystal Healing',
    description: 'Behind the Aura Photography Vendor',
    address: {
      street: '969 Sunshine Ct',
      city: 'Sedona',
      state: 'AZ',
      zip: '13212',
    },
  },
  {
    id: '5',
    name: "Pike's Peak Training",
    address: {
      street: '132 Academy Way',
      city: 'Colorado Springs',
      state: 'CO',
      zip: '86032',
    },
  },
  {
    id: '7',
    name: 'Rock and Roll Training Popup',
    description: 'Available weekends at the Rock Hall Beer Garden',
    address: {
      street: '123 Superior',
      city: 'Cleveland',
      state: 'OH',
      zip: '44123',
    },
  },
];
export const locationHandlers = [
  http.get('https://api.hypertheory.com/locations', async () => {
    await delay();
    //return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(locations);
  }),
];

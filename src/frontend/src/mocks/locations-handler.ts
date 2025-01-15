import { delay, http, HttpResponse } from "msw";
import { TrainingLocationCreateModel, TrainingLocationModel } from "../app/pages/types";

const locations:TrainingLocationModel[] = [
    {
        id: '1',
        name: 'World Headquarters',
        address: {
            street: '119 Marginal',
            state: 'OH',
            city: 'Cleveland',
            zip: '44107'
        },
        phone: '555-1212'
    },
    {
        id: '2',
        name: 'Temporary - Codemash 2025',
        address: {
            street: '119 Marginal',
            state: 'OH',
            city: 'Cleveland',
            zip: '44107'
        },
        phone: '555-1212',
        note: 'During the Codemash Conference'
    }
]
export const LocationsHandler = [
    http.get('https://api.hypertheory.com/locations', () => {
        return HttpResponse.json(locations)
    }),
    http.get('https://api.hypertheory.com/locations/:id', async ({params}) => {

        const id = params['id'];
        const location= locations.find(l => l.id === id);
        await delay(2000)
        if(location !==null) {
            return HttpResponse.json(location);
        } else {
            return new HttpResponse(null, { status: 404, statusText: 'No Location with that id'})
        }

    }),
    http.post('https://api.hypertheory.com/locations', async ({request}) => {

        const postedBody = await    request.json() as unknown as TrainingLocationCreateModel; 
        // to do error handling or not?
        const actualBody: TrainingLocationModel = {
            id: crypto.randomUUID(),
            ...postedBody
        }
        await delay(2000)
        locations.push(actualBody)
        return new HttpResponse(null, { status: 400 })
        return HttpResponse.json(actualBody);
    })
]
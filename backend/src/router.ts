import * as express from 'express'
import Meters from './models/meters.json'
import Locations from './models/locations.json'
import cors from 'cors'

class Router {

    constructor(server: express.Express) {
        const router = express.Router()

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `Nothing to see here, [url]/meters instead.`
            })
        })

        //get all meters
        router.get('/meters', cors(), (req: express.Request, res: express.Response) => {
            res.json({
                Meters
            })

        })

        //get location
        router.get('/locations', cors(), (req: express.Request, res: express.Response) => {
            //get location info based on location id
            const query = req.query.id
            if (query !== undefined) {
                let location: any = Locations.find(x => x.locationId === query)
                if (location == undefined) {
                    //Return default location If location id exists in Meters json
                    const meters = Meters.find(x => x.locationId === query)
                    if (meters !== undefined) {
                        location = Locations[0]
                        location.locationId = query
                    }
                }
                res.json({
                    location
                })
                return
            }
            //get all locations
            res.json({
                Locations
            })

        })

        router.options('*', cors());

        server.use('/', router)
    }
}

export default Router;
import * as express from 'express'
import Meters from './models/meters.json'
import cors from 'cors'

class Router {

    constructor(server: express.Express) {
        const router = express.Router()

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `Nothing to see here, [url]/meters instead.`
            })
        })

        //get all cats
        router.get('/meters', cors(), (req: express.Request, res: express.Response) => {
            res.json({
                Meters
            })
        })

        router.options('*', cors());

        server.use('/', router)
    }
}

export default Router;
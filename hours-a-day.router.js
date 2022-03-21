import Router from "express"
import Data from "./Data.js";
import HoursADayController from "./hours-a-day.controller.js";

const router = new Router()

router.post('/hoursADay', HoursADayController.create)
router.get('/hoursADay', HoursADayController.getAll)
router.get('/hoursADay/:id', HoursADayController.getOne)
router.put('/hoursADay', HoursADayController.update)
router.delete('/hoursADay/:id', HoursADayController.delete)

export default router;
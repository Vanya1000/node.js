import Router from "express"

import HoursADayController from "./hours-a-day.controller.js";
import authMiddleware from "./middleware/authMiddleware.js";
const router = new Router()

router.post('/hoursADay', authMiddleware, HoursADayController.create)
router.get('/hoursADay', authMiddleware, HoursADayController.getAll)
router.get('/hoursADay/:id', authMiddleware, HoursADayController.getOne)
router.put('/hoursADay', authMiddleware, HoursADayController.update)
router.delete('/hoursADay/:id', authMiddleware, HoursADayController.delete)


export default router;
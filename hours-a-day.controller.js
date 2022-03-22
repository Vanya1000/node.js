
import hoursADayService from "./hours-a-day.service.js"// и теперь вместо создания post внутри контроллера мы просто дергаем метод у service
// контроллер где ты достаешь всякие query, боди и прочее + валидацию можно сделать и status code отправить, + ошибки ловишь

class HoursADayController {
	async create(req, res) {
		try {
			const hoursADayItem = await hoursADayService.create(req.body) // обращаемся к service => вызываем функцию create и туда передаем post который получаем в теле запроса.
			res.status(200).json(hoursADayItem) // обратно на клиент возвращаем созданный Item
		} catch (e) {
			res.status(500).json(e) // в случае ошибки
		}
	}

	async getOne(req, res) {
		try {
			const hoursADayItem = await hoursADayService.getOne(req.params.id)
			return res.status(200).json(hoursADayItem)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}

	async getAll(req, res) {
		try {
			const hoursADayItemsAll = await hoursADayService.getAll()// получение всего
			return res.status(200).json(hoursADayItemsAll);
		} catch (e) {
			res.status(500).json(e)
		}
	}

	

	async update(req, res) {
		try {
			const updatedHoursADayItem = await hoursADayService.update(req.body)
			return res.status(200).json(updatedHoursADayItem)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}

	async delete(req, res) {
		try {
			const deleteHoursADayItem = await hoursADayService.delete(req.params.id)
			return res.status(200).json(dataWithMongoDB)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}
	async getUsers(req, res) {
		try {
			res.status(200).json('work')
		} catch (e) {
			res.status(500).json(e.message)
		}
	}
}

export default new HoursADayController()
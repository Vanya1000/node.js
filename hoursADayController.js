import Data from "./data.js"

class HoursADayController {
	async create(req, res) {
		try {
			const { date, hour } = req.body
			const dataWithMongoDB = await Data.create({ date, hour })// передать объект соответствующий схеме описанной
			console.log(req.body)
			res.json(dataWithMongoDB) // обратно на клиент возвращаем созданный post
		} catch (e) {
			res.status(500).json(e) // в случае ошибки
		}
	}

	async getAll(req, res) {
		try {
			const dataWithMongoDB = await Data.find();// получение всего
			return res.json(dataWithMongoDB);
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getOne(req, res) {
		try {
			const {id} = req.params // достаем из строки id
			if (!id) {
				res.status(400).json({ message: 'id not specified'})
			}
			const dataWithMongoDB = await Data.findById(id);
			return res.json(dataWithMongoDB)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async update(req, res) {
		try {
			const dataWithMongoDB = req.body
			if (!dataWithMongoDB._id) {
				res.status(400).json({ message: 'id not specified' })
			}
			const updateddataWithMongoDB = await Data.findByIdAndUpdate(dataWithMongoDB._id, dataWithMongoDB, {new: true} ) // мы этот пост обновим и нам вернется обновленная версия
			return res.json(updateddataWithMongoDB)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params // достаем из строки id
			if (!id) {
				res.status(400).json({ message: 'id not specified' })
			}
			const dataWithMongoDB = await Data.findByIdAndDelete(id);
			return res.json(dataWithMongoDB)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new HoursADayController()
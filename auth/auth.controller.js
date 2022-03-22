
import bcrypt from "bcryptjs/dist/bcrypt.js";
import Role from "./role.repository.js"
import User from "./user.repository.js"
import { validationResult } from "express-validator" // будет возвращать ошибки полученные в следствии валидации
import jwt from 'jsonwebtoken' //создание токена
import KEY from "./config.js";



// функция создания токена
const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	}
	return jwt.sign(payload, KEY.secret, { expiresIn: "24h" }) // сколько будет жить токен
}

// регистрация, авторизация и получение пользователей

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req) //выцепит из запроса поля и провалидирует
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: "Error registration", errors })
			}
			const { username, password } = req.body;
			const candidate = await User.findOne({ username }) // поиск в БД пользователя
			if (candidate) {
				return res.status(400).json({ message: "User with this username address already exists"})
			} // если нашли, то вернули ошибку
			const hashPassword = bcrypt.hashSync(password, 7) // хэшируем пароль
			const userRole = await Role.findOne({ value: "USER" }) // нашли роль
			const user = new User({ username, password: hashPassword, roles: [userRole.value] })// создали пользователя
			await user.save()
			return res.json({ message: 'User has been successfully registered' })
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Registration error' })
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })// находим в БД
			if (!user) {
				return res.status(400).json({ message: `User ${username} not found!` })
			}
			const validPassword = bcrypt.compareSync(password, user.password)// расхеширование и check пароля
			if (!validPassword) {
				return res.status(400).json({ message: `Invalid password` })
			}
			const token = generateAccessToken(user._id, user.roles)// генерируем токен 
			return res.json({ token })
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Login error' })
		}
	}

	async getUsers(req, res) {
		try {
			console.log(req.user);
			const users = await User.findById(req.user.id) // получаю себя по id
			res.json(users)// возвращаем массив пользователей
		} catch (e) {
			console.log(e)
		}
	}
}

export default new AuthController()
import jwt from 'jsonwebtoken'
import KEY from "../auth/config.js";

export default function (req, res, next) { // принимает параметром запрос ответ и функцию next которая вызывает по цепочке следующий middleware
	if (req.method === "OPTIONS") {
		next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]// вытащим токен из заголовка
		if (!token) {
			return res.status(403).json({ message: "Пользователь не авторизован" })
		}
		const decodedData = jwt.verify(token, KEY.secret) //расшифровываем токен По итогу в переменной будет объект с id и ролями пользователя
		req.user = decodedData // создаем новое поле user и добавляем туда эти данные
		next() // и вызываем следующий по цепочке  middleware
	} catch (e) {
		console.log(e)
		return res.status(403).json({ message: "Пользователь не авторизован" })
	}
};

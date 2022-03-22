import express from "express";
import mongoose from "mongoose"; // оболочка для упрощения взаимодействия с mongoDB

import router from "./hours-a-day.router.js";
import authRouter from "./auth/auth.router.js";

import cors from "cors"




const PORT = process.env.PORT || 5000;
const DB_URL = 'mongodb+srv://Vanya1000:08000000@cluster0.wdieh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()




// V отображение при обращении к корневому каталогу V
app.get('/', (req, res) => {
	//console.log(req.query);//принимаем get запросы
	res.status(200).json('Server work')
}) 


// V middleware module V
app.use(cors())
app.use(express.json()) // express по умолчанию не может преобразовать json и необходимо явно указать и теперь функц будет парсить json который будет прилетать к нам в запросах.
app.use('/api', router) // Нужно зарегистрировать router //? попробовать вынести в отдельный файл authRouter
app.use('/auth', authRouter)


 


async function startApp() {
	try {
		await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }) // подключение к БД
		app.listen(PORT, () => console.log('server start on port: ' + PORT)) // запуск приложения
	} catch (e) {
		console.log(e);
	}
}

startApp()

//? npm run dev запуск!
// git add.
// git commit -m "change cors"
// git push heroku master
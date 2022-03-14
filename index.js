import express from "express";
import mongoose from "mongoose"; // оболочка для упрощения взаимодействия с mongoDB
import router from "./router.js";
//? npm run dev запуск!




const PORT = 5000;
const DB_URL = 'mongodb+srv://Vanya1000:08000000@cluster0.wdieh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

app.get('/', (req, res) => {
	console.log(req.query);//принимаем get запросы
	res.status(200).json('Server work2')
}) 

app.use(express.json()) // express по умолчанию не может преобразовать json и необходимо явно указать
app.use('/api', router) // Нужно зарегистрировать router





async function startApp() {
	try {
		await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }) // подключение к БД
		app.listen(PORT, () => console.log('START SERVER' + PORT)) // запуск приложения
	} catch (e) {
		console.log(e);
	}
}

startApp()

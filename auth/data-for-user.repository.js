import mongoose from "mongoose";


const userSchema = mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [{ type: String, ref: 'Role' }]// ссылка на другую сущность
});

const dataForUserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'newUser' },
	date: { type: String, required: true },
	hour: { type: String, required: true }
});

export const DataForUser = mongoose.model('DataForUser', dataForUserSchema);
export const newUser = mongoose.model('newUser', userSchema);

//Первый аргумент - уникальное имя создаваемой для модели коллекции(Mongoose создаст коллекцию для модели Story),
// второй аргумент - схема, которая используется для создания модели.

//Схемы "компилируются "  в окончательную модель методом  mongoose.model().
//После создания модели её можно использовать для поиска, создания, обновления и удаления объектов данного типа.
//Примечание: Каждой модели соответствует коллекция документов в ДБ MongoDB. 
//Документы будут содержать поля тех типов, которые заданы в модели Schema


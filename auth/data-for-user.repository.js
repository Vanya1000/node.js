import mongoose from "mongoose";


const DataForUser = mongoose.Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ссылаться на модель user
	date: { type: String, required: true },
	hour: { type: String, required: true },
	dateCreate: {type: Date, default: Date.now}
});

export default mongoose.model('DataForUser', DataForUser);
/* export const newUser = mongoose.model('newUser', userSchema); */

//Первый аргумент - уникальное имя создаваемой для модели коллекции(Mongoose создаст коллекцию для модели Story),
// второй аргумент - схема, которая используется для создания модели.

//Схемы "компилируются "  в окончательную модель методом  mongoose.model().
//После создания модели её можно использовать для поиска, создания, обновления и удаления объектов данного типа.
//Примечание: Каждой модели соответствует коллекция документов в ДБ MongoDB. 
//Документы будут содержать поля тех типов, которые заданы в модели Schema


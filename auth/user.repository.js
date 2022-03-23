import mongoose from "mongoose";

const User = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [{type: String, ref: 'Role'}],// ссылка на другую сущность
	dataForUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DataForUser'}]
})

export default mongoose.model('User', User)
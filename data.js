import mongoose from "mongoose";

const Data = new mongoose.Schema({
	date: { type: String, required: true },
	hour: { type: String, required: true }
})

export default mongoose.model('Data', Data)
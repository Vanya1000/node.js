import Data from "./Data.js"
// в сервисах типа всякая логика сложная, когда будет поймёшь о чем я, типа преобразования данных, вызовы других ендпойнтов и что то с их результатом делание и тд
// здессь только логика с базой данных и созданием ItemPost от res и req мы здесь не зависим
class HoursADayService {
	async create(hoursADayItem) {
		const createdHoursADayItem = await Data.create(hoursADayItem); // уже созданный post с присвоенным id
		return createdHoursADayItem;
	}

	async getOne(id) {
		if (!id) {
			throw new Error('id not specified');// validation input param
		}
		const hoursADayItem = await Data.findById(id);
		return hoursADayItem;
	}

	async getAll() {
		const hoursADayItemsAll = await Data.find();// получение всего
		return hoursADayItemsAll;
	}



	async update(hoursADayItem) {
		if (!hoursADayItem._id) {
			throw new Error('id not specified');
			}
		const updatedHoursADayItem = await Data.findByIdAndUpdate(hoursADayItem._id, hoursADayItem, { new: true }) // мы этот пост обновим и нам вернется обновленная версия
		return updatedHoursADayItem
	}

	async delete(id) {
			if (!id) {
				throw new Error('id not specified');
			}
		const deleteHoursADayItem = await Data.findByIdAndDelete(id);
		return deleteHoursADayItem
		}
}

export default new HoursADayService();
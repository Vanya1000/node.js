import DataForUser from "./auth/data-for-user.repository.js";
import Data from "./hours-a-day.repository.js.js"

// в сервисах типа всякая логика сложная, когда будет поймёшь о чем я, типа преобразования данных, вызовы других ендпойнтов и что то с их результатом делание и тд
// здессь только логика с базой данных и созданием ItemPost от res и req мы здесь не зависим
class HoursADayService {
	async create(hoursADayItem) {
		const createdHoursADayItem = await DataForUser.create(hoursADayItem); // уже созданный post с присвоенным id и id author
		return createdHoursADayItem;
	}

	async getOne(id) {
		if (!id) {
			throw new Error('id not specified');// validation input param
		}
		const hoursADayItem = await DataForUser.findById(id);
		return hoursADayItem;
	}

	async getAll(id) {
		const hoursADayItemsAll = await DataForUser.find({author: id});// получение всего по id author
		return hoursADayItemsAll;
	}



	async update(hoursADayItem) {
		if (!hoursADayItem._id) {
			throw new Error('id not specified');
			}
		const updatedHoursADayItem = await DataForUser.findByIdAndUpdate(hoursADayItem._id, hoursADayItem, { new: true }) // мы этот пост обновим и нам вернется обновленная версия
		return updatedHoursADayItem
	}

	async delete(id) {
			if (!id) {
				throw new Error('id not specified');
			}
		const deleteHoursADayItem = await DataForUser.findByIdAndDelete(id);
		return deleteHoursADayItem
		}
}

export default new HoursADayService();
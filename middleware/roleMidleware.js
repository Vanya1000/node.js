export default function (roles) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next()
		}

		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(403).json({ message: "Пользователь не авторизован" })
			}
			const { roles: userRoles } = jwt.verify(token, KEY.secret)
			let hasRole = false
			userRoles.forEach(role => { //есть ли в списке ролей те роли, которые разрешены для этой функции
				if (roles.includes(role)) {
					hasRole = true
				}
			})
			if (!hasRole) {
				return res.status(403).json({ message: "У вас нет доступа" })
			}
			next();
		} catch (e) {
			console.log(e)
			return res.status(403).json({ message: "Пользователь не авторизован" })
		}
	}
};
'use strict';

const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const password1 = await bcrypt.hash('password123', 10);
		const password2 = await bcrypt.hash('password123', 10);
		const password3 = await bcrypt.hash('password123', 10);
		const password4 = await bcrypt.hash('password123', 10);

		return queryInterface.bulkInsert('Users', [
			{
				username: 'user1',
				email: 'user1@example.com',
				password: password1,
				role: 'user',
				phoneNumber: '0807272XXXX',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'user2',
				email: 'user2@example.com',
				password: password2,
				role: 'admin',
				phoneNumber: '0807272YXXX',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'user3',
				email: 'user3@example.com',
				password: password3,
				role: 'user',
				phoneNumber: '0807272WXXX',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'user4',
				email: 'user4@example.com',
				password: password4,
				role: 'admin',
				phoneNumber: '0807272ZXXX',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	},
};

'use strict';

const { fakerES: faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("123456", salt);

    let users = [
      {email: "admin@mail.com", password: password, name: "Admin", rol_id: 1, createdAt: faker.date.past() },
      {email: faker.internet.email(), password: faker.internet.password(), name: faker.person.firstName(), rol_id: 2, createdAt: faker.date.past() },
      {email: faker.internet.email(), password: faker.internet.password(), name: faker.person.firstName(), rol_id: 3, createdAt: faker.date.past()},
    ]
    await queryInterface.bulkInsert('users', users, {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
     
  }
};

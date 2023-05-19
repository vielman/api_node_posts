'use strict';

const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let users = [
      {email: faker.internet.email(), password: faker.internet.password(), name: faker.person.firstName(), createdAt: faker.date.past(), rol_id: 1},
      {email: faker.internet.email(), password: faker.internet.password(), name: faker.person.firstName(), createdAt: faker.date.past(), rol_id: 2},
      {email: faker.internet.email(), password: faker.internet.password(), name: faker.person.firstName(), createdAt: faker.date.past(), rol_id: 3},
    ]
    await queryInterface.bulkInsert('users', users, {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
     
  }
};

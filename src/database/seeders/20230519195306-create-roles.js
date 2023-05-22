'use strict';

const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let roles = [
        {name: "Admin", options: "All", createdAt: faker.date.past()},
        {name: "Publisher", options: "List,Create,Delete,Update", createdAt: faker.date.past()},
        {name: "Reader", options: "List", createdAt: faker.date.past()},
    ]
    
    await queryInterface.bulkInsert('roles', roles, {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('roles', null, {});
     
  }
};

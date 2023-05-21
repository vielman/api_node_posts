'use strict';

const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let roles = [
        {name: "Admin", options: "Todo", createdAt: faker.date.past()},
        {name: "Creador", options: "Consultar, Crear, Eliminae", createdAt: faker.date.past()},
        {name: "Editor", options: "Consultar, Actualizar", createdAt: faker.date.past()},
    ]
    
    await queryInterface.bulkInsert('roles', roles, {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('roles', null, {});
     
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let roles = [
        {name: "Admin", options: "Todo"},
        {name: "Creador", options: "Consultar, Crear, Eliminae"},
        {name: "Editor", options: "Consultar, Actualizar"},
    ]
    
    await queryInterface.bulkInsert('roles', roles, {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('roles', null, {});
     
  }
};

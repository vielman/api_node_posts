'use strict';

const { fakerES: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let posts = [
      {title: faker.lorem.sentence(), content: faker.lorem.paragraph(), createdAt: faker.date.past()},
      {title: faker.lorem.sentence(), content: faker.lorem.paragraph(), createdAt: faker.date.past()},
      {title: faker.lorem.sentence(), content: faker.lorem.paragraph(), createdAt: faker.date.past()},
     
    ]
    await queryInterface.bulkInsert('posts', posts, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('posts', null, {});

  }
};

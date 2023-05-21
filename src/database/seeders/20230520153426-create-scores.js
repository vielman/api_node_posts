'use strict';

const { fakerES: faker } = require('@faker-js/faker');
const { Posts } = require('../../models/index')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      let scores = [];
      let posts = await Posts.findAll();
      posts.forEach(post => {
        scores.push({score: random(1, 5), post_id: post.id,  createdAt: faker.date.past()})
        scores.push({score: random(1, 5), post_id: post.id,  createdAt: faker.date.past()})
      });

      await queryInterface.bulkInsert('scores', scores, {});
    },
  
    async down (queryInterface, Sequelize) {
  
      await queryInterface.bulkDelete('scores', null, {});
  
    }
};

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}
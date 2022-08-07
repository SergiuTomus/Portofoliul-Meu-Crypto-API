"use strict";
const config = require("../config/db.config");
const Sequelize = require("sequelize");
const db = {};

console.log("-- config.dialect ", config.dialect); // to delete

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    // port: 5432,
    // pool: {
    //   max: config.pool.max,
    //   min: config.pool.min,
    //   acquire: config.pool.acquire,
    // },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

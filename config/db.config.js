module.exports = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // port: parseInt(process.env.DATABASE_PORT),
  dialect: "mysql",
  pool: {
    min: 0,
    max: 20,
    acquire: 200000,
  },
};

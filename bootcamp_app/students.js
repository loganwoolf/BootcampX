require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  datab: process.env.PG_DB
});
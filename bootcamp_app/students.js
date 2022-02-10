require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  database: process.env.PG_DB
});

const cohort = process.argv[2];
const limit = process.argv[3];

pool.query(`
SELECT
  students.id AS id,
  students.name AS name,
  cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '${cohort}%'
LIMIT ${limit}
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an ID of ${user.id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch(err => console.error("QUERY ERROR:", err.stack));
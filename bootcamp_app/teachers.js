require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  database: process.env.PG_DB
});

const cohort = process.argv[2];
const values = [cohort];
const queryString = `
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = $1
  ORDER BY teacher;
`;

pool
  .query(queryString, values)
  .then(res => {
    res.rows.forEach(entry => {
      console.log(`${entry.cohort}: ${entry.teacher}`);
    });
  })
  .catch(err => console.error("QUERY ERROR:", err.stack));
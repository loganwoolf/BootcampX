SELECT cohorts.name AS cohort, COUNT(assignment_submissions.*) AS total_submissions
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
JOIN assignment_submissions ON assignment_submissions.student_id = students.id
GROUP BY cohorts.name
ORDER BY total_submissions DESC;
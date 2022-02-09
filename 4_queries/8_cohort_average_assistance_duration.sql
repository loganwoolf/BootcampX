SELECT AVG(total_duration) AS average_total_duration
FROM (
  SELECT cohorts.name, SUM(completed_at - started_at) AS total_duration
  FROM assistance_requests
  JOIN students on students.id = assistance_requests.student_id
  JOIN cohorts on cohorts.id = students.cohort_id
  GROUP BY cohorts.name
) AS total_durations;
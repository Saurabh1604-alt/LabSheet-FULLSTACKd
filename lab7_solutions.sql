-- =====================================================================
-- COER UNIVERSITY, ROORKEE | Dept. of CSE | Lab Sheet 7 - SQL
-- Solutions for Parts A to H  (written for MySQL 8 / MariaDB)
--
-- HOW TO RUN
--   mysql -u root -p --table < lab7_solutions.sql
-- or open it in MySQL Workbench and run statement by statement
-- (Ctrl+Enter) so you can take a screenshot of each result.
--
-- NOTES
--  * The script is sequential: later parts see the changes made by
--    earlier parts (e.g. B3 moves Rohan to Roorkee, B4 adds 5 marks to
--    course 203, G6 commits marks=100 for student 101 / course 201).
--  * B6 (age = 15) is deliberately an error, so it is commented out.
--    Run it by itself and record the message.
--  * PostgreSQL users: use \c college_db instead of USE, replace
--    START TRANSACTION with BEGIN, and DROP INDEX idx_students_city
--    ON students with DROP INDEX idx_students_city.
-- =====================================================================


-- =====================================================================
-- SETUP
-- =====================================================================
DROP DATABASE IF EXISTS college_db;
CREATE DATABASE college_db;
USE college_db;

CREATE TABLE departments (
    dept_id   INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    age        INT CHECK (age >= 17),
    city       VARCHAR(50),
    dept_id    INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    title     VARCHAR(80) NOT NULL,
    credits   INT DEFAULT 3,
    dept_id   INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id  INT,
    marks      INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)
);

INSERT INTO departments VALUES (1,'CSE'),(2,'ECE'),(3,'Mechanical'),(4,'Civil');

INSERT INTO students VALUES
(101,'Aarav',20,'Roorkee',1),
(102,'Diya',21,'Dehradun',1),
(103,'Kabir',19,'Haridwar',2),
(104,'Meera',22,'Roorkee',1),
(105,'Rohan',20,'Delhi',3),
(106,'Sana',21,'Dehradun',2),
(107,'Vikram',23,'Jaipur',NULL),
(108,'Isha',19,'Roorkee',2);

INSERT INTO courses VALUES
(201,'Data Structures',4,1),
(202,'Operating Systems',4,1),
(203,'Digital Electronics',3,2),
(204,'Thermodynamics',3,3),
(205,'Machine Learning',4,1);

INSERT INTO enrollments VALUES
(101,201,88),(101,202,76),(101,205,91),
(102,201,67),(102,205,72),
(103,203,81),
(104,201,95),(104,202,89),
(105,204,58),
(106,203,74),
(108,203,66);

-- Check: must return 8 rows
SELECT * FROM students;


-- =====================================================================
-- PART A: DDL
-- =====================================================================

-- A1: create faculty
CREATE TABLE faculty (
    faculty_id INT PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    email      VARCHAR(80) UNIQUE,
    salary     DECIMAL(10,2),
    dept_id    INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
DESCRIBE faculty;

-- A2: add column phone
ALTER TABLE faculty ADD COLUMN phone VARCHAR(15);
DESCRIBE faculty;

-- A3: rename phone to contact_no
-- (older MySQL 5.7: ALTER TABLE faculty CHANGE phone contact_no VARCHAR(15);)
ALTER TABLE faculty RENAME COLUMN phone TO contact_no;
DESCRIBE faculty;

-- A4: drop contact_no
ALTER TABLE faculty DROP COLUMN contact_no;
DESCRIBE faculty;

-- A5: drop the table completely
DROP TABLE faculty;

/*
A5 - DROP vs TRUNCATE vs DELETE

 DROP      : DDL. Removes the whole table - data AND structure (columns,
             indexes, constraints). The table no longer exists. Cannot
             be rolled back.
 TRUNCATE  : DDL. Removes ALL rows but keeps the table structure. Fast,
             no WHERE clause, resets AUTO_INCREMENT, normally cannot be
             rolled back. Fails on a table referenced by a foreign key.
 DELETE    : DML. Removes rows one by one, optionally filtered with
             WHERE. Slower, can be rolled back inside a transaction,
             fires triggers, does not reset AUTO_INCREMENT.
*/


-- =====================================================================
-- PART B: DML
-- =====================================================================

-- B1: insert Neha
INSERT INTO students VALUES (109, 'Neha', 20, 'Roorkee', 1);

-- B2: insert without city -> the column is not given a value, so it
--     stores NULL (there is no DEFAULT defined for city)
INSERT INTO students (student_id, name, age, dept_id) VALUES (110, 'Test', 21, 2);
SELECT * FROM students WHERE student_id = 110;      -- city shows NULL

-- B3: update city of 105
UPDATE students SET city = 'Roorkee' WHERE student_id = 105;

-- B4: +5 marks for course 203
UPDATE enrollments SET marks = marks + 5 WHERE course_id = 203;
SELECT * FROM enrollments WHERE course_id = 203;

-- B5: delete 109 and the extra test row 110
DELETE FROM students WHERE student_id IN (109, 110);
SELECT COUNT(*) AS total_students FROM students;    -- back to 8

-- B6: age 15 violates the CHECK constraint on students.age.
--     Uncomment and run alone:
-- INSERT INTO students VALUES (111, 'Tiny', 15, 'Roorkee', 1);
/*
 Error message (depends on the server):
   MySQL 8.0.16+ : ERROR 3819 (HY000): Check constraint 'students_chk_1' is violated.
   MariaDB       : ERROR 4025 (23000): CONSTRAINT `students.age` failed for `college_db`.`students`
   PostgreSQL    : new row for relation "students" violates check constraint "students_age_check"

 Cause: the CHECK (age >= 17) constraint declared on the age column.
 15 is less than 17, so the row is rejected and nothing is inserted.
*/


-- =====================================================================
-- PART C: SELECT
-- =====================================================================

-- C1
SELECT * FROM students;

-- C2
SELECT name, city FROM students;

-- C3
SELECT * FROM students WHERE city = 'Roorkee';

-- C4
SELECT * FROM students WHERE age BETWEEN 20 AND 22;

-- C5
SELECT * FROM students WHERE city IN ('Roorkee', 'Dehradun');

-- C6
SELECT * FROM students WHERE name LIKE 'A%';

-- C7
SELECT * FROM students WHERE dept_id IS NULL;

-- C8
SELECT DISTINCT city FROM students;

-- C9
SELECT * FROM students ORDER BY age DESC, name ASC;

-- C10
SELECT * FROM students ORDER BY age DESC LIMIT 3;

-- C11
SELECT name AS `Student Name`, age AS Age FROM students;


-- =====================================================================
-- PART D: FUNCTIONS AND AGGREGATION
-- =====================================================================

-- D1
SELECT COUNT(*) AS total_students FROM students;

-- D2
SELECT AVG(marks) AS avg_marks,
       MIN(marks) AS min_marks,
       MAX(marks) AS max_marks
FROM enrollments;

-- D3
SELECT city, COUNT(*) AS num_students
FROM students
GROUP BY city;

-- D4
SELECT course_id, AVG(marks) AS avg_marks
FROM enrollments
GROUP BY course_id;

-- D5
SELECT city, COUNT(*) AS num_students
FROM students
GROUP BY city
HAVING COUNT(*) > 1;

-- D6
SELECT d.dept_name, SUM(c.credits) AS total_credits
FROM departments d
JOIN courses c ON c.dept_id = d.dept_id
GROUP BY d.dept_id, d.dept_name;

-- D7
SELECT UPPER(name) AS upper_name, LENGTH(name) AS name_length
FROM students;

/*
D8 - WHERE vs HAVING
 WHERE filters individual ROWS before grouping happens, so at that moment
 no aggregate value (COUNT, SUM, AVG ...) exists yet and it cannot be used
 in WHERE.
 HAVING filters GROUPS after GROUP BY has been applied, so it can use
 aggregates, e.g. HAVING COUNT(*) > 1.
 Order of execution: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.
*/


-- =====================================================================
-- PART E: JOINS
-- =====================================================================

-- E1: INNER JOIN
SELECT s.name, d.dept_name
FROM students s
INNER JOIN departments d ON s.dept_id = d.dept_id;

-- E2: LEFT JOIN  -> Vikram shows NULL (he has no department)
SELECT s.name, d.dept_name
FROM students s
LEFT JOIN departments d ON s.dept_id = d.dept_id;

-- E3: all departments incl. those with no students (Civil)
SELECT d.dept_name, s.name
FROM departments d
LEFT JOIN students s ON s.dept_id = d.dept_id;
-- equivalent RIGHT JOIN:
-- SELECT d.dept_name, s.name
-- FROM students s RIGHT JOIN departments d ON s.dept_id = d.dept_id;

-- E4: three-table join
SELECT s.name, c.title, e.marks
FROM students s
JOIN enrollments e ON e.student_id = s.student_id
JOIN courses c     ON c.course_id  = e.course_id;

-- E5
SELECT s.name
FROM students s
JOIN enrollments e ON e.student_id = s.student_id
JOIN courses c     ON c.course_id  = e.course_id
WHERE c.title = 'Data Structures';

-- E6: not enrolled in anything (Vikram)
SELECT s.name
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.student_id
WHERE e.student_id IS NULL;

-- E7: students per course, zero-enrollment courses included
--     (COUNT(e.student_id) ignores NULLs, so unmatched courses give 0)
SELECT c.course_id, c.title, COUNT(e.student_id) AS num_enrolled
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.course_id
GROUP BY c.course_id, c.title;

-- E8: students and average age per department
SELECT d.dept_name,
       COUNT(s.student_id) AS num_students,
       AVG(s.age)          AS avg_age
FROM departments d
LEFT JOIN students s ON s.dept_id = d.dept_id
GROUP BY d.dept_id, d.dept_name;


-- =====================================================================
-- PART F: SUBQUERIES
-- =====================================================================

-- F1
SELECT * FROM students
WHERE age > (SELECT AVG(age) FROM students);

-- F2: student(s) with the highest marks in any course
SELECT s.name, e.course_id, e.marks
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
WHERE e.marks = (SELECT MAX(marks) FROM enrollments);

-- F3: courses with at least one enrollment
SELECT * FROM courses
WHERE course_id IN (SELECT course_id FROM enrollments);
-- EXISTS version:
-- SELECT * FROM courses c
-- WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.course_id = c.course_id);

-- F4: enrolled in more than 2 courses
SELECT s.name, COUNT(*) AS courses_taken
FROM students s
JOIN enrollments e ON e.student_id = s.student_id
GROUP BY s.student_id, s.name
HAVING COUNT(*) > 2;

-- F5: department with the most students
--     CSE and ECE tie at 3 each, so compare against MAX instead of LIMIT 1
--     (LIMIT 1 would silently hide one of the tied departments).
SELECT d.dept_name, COUNT(*) AS num_students
FROM departments d
JOIN students s ON s.dept_id = d.dept_id
GROUP BY d.dept_id, d.dept_name
HAVING COUNT(*) = (
    SELECT MAX(cnt) FROM (
        SELECT COUNT(*) AS cnt
        FROM students
        WHERE dept_id IS NOT NULL
        GROUP BY dept_id
    ) AS dept_counts
);

-- F6: correlated subquery - above that course's average
SELECT s.name, e.course_id, e.marks
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
WHERE e.marks > (
    SELECT AVG(e2.marks)
    FROM enrollments e2
    WHERE e2.course_id = e.course_id
)
ORDER BY e.course_id, e.marks DESC;


-- =====================================================================
-- PART G: INDEXES, VIEWS, TRANSACTIONS
-- =====================================================================

-- G1: index + EXPLAIN
EXPLAIN SELECT * FROM students WHERE city = 'Roorkee';     -- before

CREATE INDEX idx_students_city ON students(city);

EXPLAIN SELECT * FROM students WHERE city = 'Roorkee';     -- after
/*
 What to note (in the sample run on this 8-row table):
  Before: possible_keys = NULL, key = NULL, type = ALL -> full table scan.
  After : possible_keys = idx_students_city appears, i.e. the optimizer now
          knows the index exists.
 With only 8 rows MySQL/MariaDB may still pick a full scan (type = ALL,
 key = NULL) because reading 8 rows is cheaper than using the index. On a
 large table the plan changes to type = ref, key = idx_students_city and
 'rows' drops sharply. If you want to see it on this table, try
 EXPLAIN SELECT * FROM students FORCE INDEX (idx_students_city) WHERE city = 'Roorkee';
*/

-- G2: view
CREATE VIEW student_marks AS
SELECT s.name, c.title, e.marks
FROM students s
JOIN enrollments e ON e.student_id = s.student_id
JOIN courses c     ON c.course_id  = e.course_id;

-- G3
SELECT * FROM student_marks WHERE marks > 80;

-- G4
DROP VIEW student_marks;
DROP INDEX idx_students_city ON students;

-- G5: ROLLBACK
SELECT marks FROM enrollments WHERE student_id = 101 AND course_id = 201;  -- 88
START TRANSACTION;
UPDATE enrollments SET marks = 100 WHERE student_id = 101 AND course_id = 201;
SELECT marks FROM enrollments WHERE student_id = 101 AND course_id = 201;  -- 100 (inside txn)
ROLLBACK;
SELECT marks FROM enrollments WHERE student_id = 101 AND course_id = 201;  -- 88 again

-- G6: COMMIT
START TRANSACTION;
UPDATE enrollments SET marks = 100 WHERE student_id = 101 AND course_id = 201;
COMMIT;
SELECT marks FROM enrollments WHERE student_id = 101 AND course_id = 201;  -- 100, permanent


-- =====================================================================
-- PART H: CHALLENGE PROBLEMS
-- =====================================================================

-- H1: rank list by total marks (DENSE_RANK keeps ranks consecutive on ties;
--     use RANK() if you want gaps after ties)
SELECT s.name,
       COALESCE(SUM(e.marks), 0) AS total_marks,
       RANK()       OVER (ORDER BY COALESCE(SUM(e.marks), 0) DESC) AS rnk,
       DENSE_RANK() OVER (ORDER BY COALESCE(SUM(e.marks), 0) DESC) AS dense_rnk
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.student_id
GROUP BY s.student_id, s.name
ORDER BY total_marks DESC;

-- H2: grades with CASE
SELECT s.name, c.title, e.marks,
       CASE
           WHEN e.marks >= 90 THEN 'A'
           WHEN e.marks >= 75 THEN 'B'
           WHEN e.marks >= 60 THEN 'C'
           ELSE 'D'
       END AS grade
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
JOIN courses c  ON c.course_id  = e.course_id;

-- H3: pairs from the same city (s1.id < s2.id avoids (A,A) and duplicates)
SELECT s1.name AS student_1, s2.name AS student_2, s1.city
FROM students s1
JOIN students s2 ON s1.city = s2.city AND s1.student_id < s2.student_id
ORDER BY s1.city;

-- H4: second highest marks without LIMIT
SELECT MAX(marks) AS second_highest
FROM enrollments
WHERE marks < (SELECT MAX(marks) FROM enrollments);

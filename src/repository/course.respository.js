const sql = require("../../db");
const { randomUUID } = require("crypto");

class Course {
  async getAll() {
    const course = await sql`SELECT * FROM course`;
    return course;
  }

  async getById(id) {
    const course = await sql`SELECT * FROM course WHERE id = ${id}`;

    return course;
  }

  async create(course) {
    const id = randomUUID();
    const { name, author, description, duration, theme, dificulty } = course;
    const response = await sql`
    INSERT INTO course (id, name, author, description, duration, theme, dificulty)
    VALUES (${id}, ${name}, ${author}, ${description}, ${duration}, ${theme}, ${dificulty})`;

    return response;
  }

  async update(id, course) {
    const { name, author, description, duration, theme, dificulty } = course;

    const response = await sql`UPDATE course SET
    name = ${name},
    author = ${author},
    description = ${description},
    duration = ${duration},
    theme = ${theme},
    dificulty = ${dificulty}
    WHERE id = ${id}`;

    console.log(response);
    return response;
  }

  async delete(id) {
    const course = await this.getById(id);
    if (course == 0) {
      return false;
    }

    await sql`DELETE FROM course WHERE id = ${id}`;

    return true;
  }
}

module.exports = Course;

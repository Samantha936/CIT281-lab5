// Require the Fastify framework and instantiate it
const fastify = require("fastify")();

const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];

const getStudent = (id) => {
  let num = parseInt(id);
  let response = students.filter((data) => (data.id = num));
  return response[0];
};

const appendToStudent = (first, last) => {
  const biggestId = students.reduce((prev, current) => {
    if (current.id > prev) {
      return current.id;
    }
    return prev;
  }, -1);

  const newStudent = { id: biggestId + 1, first, last };
  students = [...students, newStudent];
  return students;
};

//Handle GET verb
fastify.get("/cit", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ Text: "This is a test" });
});

fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

fastify.get("/cit/student/:id", (request, reply) => {
  console.log(request.params);
  const { id } = request.params;
  let student = null;
  for (const item of students) {
    if (item.id === parseInt(id)) {
      student = item;
      break;
    }
  }

  if (!student) {
    reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Not Found");
  } else {
    if (student) {
      reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(student);
    }
  }
});

fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ Err: "Route doesn't exist" });
});

fastify.post("/cit/student", (request, reply) => {
  const { last, first } = request.body;
  const id = null;

  if (!last || !first) {
    reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Not Found");
  } else {
    let id = 0;
    for (const student of students) {
      if (student.id > id) {
        id = student.id;
      }
    }

    id++;
    students.push({ id, last, first });

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(students[students.length - 1]);
  }
  let response = request.body;

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(response);
});

//fastify

const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

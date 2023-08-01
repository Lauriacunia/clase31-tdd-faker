import express from "express";
import { faker } from "@faker-js/faker/locale/es";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** TDD
 Una función de login (con usuarios hardcodeados user = coderUser , password = 123)
 */

const login = (user, password) => {
  // si no hay user o password retornar 0
  if (!user) return 0;
  if (!password) return 1;
  if (password !== "123") return 2;
  if (user !== "coderUser") return 3;

  return 4;
};

// Escenarios
const testPass = 0;
const testNotPass = 0;
const totalTest = 5;

const runTest = () => {
  let testPass = 0;
  let testNotPass = 0;
  let totalTest = 5;
  // test1  (-)
  if (login("", "123") === 0) {
    console.log("No se ha proporcionado un usuario");
    testPass++;
  } else {
    console.log("No pass test 1");
    testNotPass++;
  }
  // test2 (-)
  if (login("coderUser", "") === 1) {
    console.log("No se ha proporcionado un password");
    testPass++;
  } else {
    console.log("No pass test 2");
    testNotPass++;
  }
  // test3
  if (login("coderUser", "1234") === 2) {
    console.log("Contraseña incorrecta");
    testPass++;
  } else {
    console.log("No pass test 3");
    testNotPass++;
  }
  // test4
  if (login("coderUser2", "123") === 3) {
    console.log("Credenciales incorrectas");
    testPass++;
  } else {
    console.log("No pass test 4");
    testNotPass++;
  }
  // test5
  if (login("coderUser", "123") === 4) {
    console.log("Logueado");
    testPass++;
  } else {
    console.log("No pass test 5");
    testNotPass++;
  }
  console.log(`Total de tests: ${totalTest}`);
  console.log(`Tests pasados: ${testPass}`);
  console.log(`Tests no pasados: ${testNotPass}`);
};

runTest();

/**
 * ===========================
 * FAKER - MOCKS
 * ===========================
 * */

app.get("/mock", (req, res) => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push(generateUser());
  }
  res.json({
    status: "success",
    payload: {
      users,
    },
  });
});

const generateUser = () => {
  const users = [];
  //const roleFaker = new faker{ ["admin", "user"]};
  const role = faker.helpers.arrayElement(["vendedor", "cliente"]);
  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      ocupation: faker.name.jobTitle(),
      rol: role,
      isPremium: faker.datatype.boolean(),
      products: generateProducts(),
    });
  }
  return users;
};

const generateProducts = () => {
  const products = [];
  for (let i = 0; i < 10; i++) {
    products.push({
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      stock: faker.datatype.number(),
      code: faker.random.alphaNumeric(5),
      description: faker.commerce.productDescription(),
    });
  }
  return products;
};

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

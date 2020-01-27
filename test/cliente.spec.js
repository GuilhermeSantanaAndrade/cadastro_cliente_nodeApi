var chai = require("chai"),
  chaiHttp = require("chai-http"),
  app = require("../src/app/config.js");
assert = chai.assert;

chai.use(chaiHttp);

describe("Testes do CRUD de clientes", () => {
  it("incluir um cliente e verificar se o mesmo está na base de dados.", async () => {
    const body = {
      nome: "AutoTest",
      idade: 18
    };

    const response1 = await chai
      .request(app)
      .post("/api/cliente")
      .send(body);
    assert.equal(response1.statusCode, 200, "Não veio statusCode 200 (POST)");
    const response1_data = JSON.parse(response1.text);

    const _id = response1_data.data._id;
    assert.exists(_id);

    const response2 = await chai.request(app).get(`/api/cliente/${_id}`);
    assert.equal(response2.statusCode, 200, "Não veio statusCode 200 (GET)");

    const response2_data = JSON.parse(response2.text);
    assert.isNotEmpty(response2_data.data);

    const preBody = {
      _id: _id,
      ...body
    };

    assert.deepEqual(
      preBody,
      response2_data.data[0],
      "O resultado no retorno não foi o esperado!"
    );
  });
});

const chai = require("chai");
const expect = require("chai").expect;
const app = require("../index");

chai.use(require("chai-http"));

describe("API endpoint /products", function() {
  this.timeout();

  before(function() {});

  after(function() {});

  it("should return all products", function() {
    chai
      .request(app)
      .get("/products")
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("array");
      });
  });

  it("should upvote a product", function() {
    return chai
      .request(app)
      .post("/upvote")
      .send({
        product_id: 1,
        name: "Chili",
        description: "Chili 101",
        upvotes: 0,
        downvotes: 0
      })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.upvotes).is.equal(1);
      });
  });

  it("should downvote a product", function() {
    return chai
      .request(app)
      .post("/downvote")
      .send({
        product_id: 1,
        name: "Chili",
        description: "Chili 101",
        upvotes: 0,
        downvotes: 0
      })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.downvotes).is.equal(1);
      });
  });
});



describe("Search photos and data", () => {
  it("user flavio login", () => {
    cy.request({
      method: "POST",
      url: "https://apialurapic.herokuapp.com/user/login",
      body: Cypress.env()
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).is.not.empty;
      expect(res.body).to.have.property("id");
    });
  });

  it("search Flavio`s photo", () => {
    cy.request({
      method: "GET",
      url: "https://apialurapic.herokuapp.com/flavio/photos",
    }).then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).is.not.empty;
    });
  });
});

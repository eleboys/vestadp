/// <reference types="cypress" />

describe("Inline Datepicker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render inline date picker", () => {
    cy.window().then((win) => {
      expect(win.dp3).not.to.be.undefined;
    });
    cy.get("#medate > .ui-vestadp-maincontainer.ui-vestadp-inline").should(
      "exist"
    );
  });
});

describe("English Datepicker", () => {

  it("should bootstrap dpEn", () => {
    cy.get("#dpEn").should("have.attr", "vestadp", "true");
  });

  it("should open dpEn on click", () => {
    cy.get("#dpEn").click();
    cy.window().its("dp2._mainContainer").should("not.be.undefined");
  });

  it("should close datepicker if somewhere on the window is clicked", () => {
    cy.get("#dpEn").click();
    cy.get("body").click("bottomRight");
    cy.window()
      .its("dp2._mainContainer")
      .should("have.class", "ui-vestadp-closed");
  });

  it("should be responsive in small screens", () => {
    cy.viewport("iphone-x");
    cy.get("#dpEn").click();
    cy.window()
      .its("dp2._mainContainer")
      .should("have.css", "position", "fixed")
      .get(".ui-vestadp-close-btn")
      .should("be.visible");
  });

  it("should close in responsive mode when close btn is clicked", () => {
    cy.viewport("iphone-x");
    cy.window()
    .its("dp2._mainContainer")
    .children(".ui-vestadp-close-btn")
    .click()
    .should("not.be.visible");
  });
});


describe("Contacts test", () => {
    beforeEach("Visit the form", () => {
        cy.visit("/")
        cy.get("form").should('be.visible')
    })
    it("Can fill the form", () => {
        cy.get('input[name="name"]').type("Vucko").should("have.value", "Vucko")
        cy.get('input[name="email"]')
            .type("vucko@gmail.com")
            .should("have.value", "vucko@gmail.com")
        cy.get("textarea")
            .type("Mind you if I ask some silly question?")
            .should("have.value", "Mind you if I ask some silly question?")
        cy.server();
        cy.route({
            url: "/users/**",
            method: "POST",
            response: { status: "Form saved!", code: 201 }
        })
        cy.get("form").submit()
        cy.contains("Form saved!").should('be.visible')
    })
    it("Fill the form widouth Name", () => {
        cy.get('input[name="email"]')
            .type("vucko@gmail.com")
            .should("have.value", "vucko@gmail.com")
        cy.get("textarea")
            .type("Mind you if I ask some silly question?")
            .should("have.value", "Mind you if I ask some silly question?")
            cy.server();
            cy.route({
                url: "/users/**",
                method: "POST",
                response: { status: "Form saved!", code: 201 }
            })
        cy.get("form").submit()
        cy.contains("Form saved!").should('not.be.visible')
    })
    it("Fill the form widouth Email", () => {
        cy.get('input[name="name"]').type("Vucko").should("have.value", "Vucko")
        cy.get("textarea")
            .type("Mind you if I ask some silly question?")
            .should("have.value", "Mind you if I ask some silly question?")
        cy.server();
        cy.route({
            url: "/users/**",
            method: "POST",
            response: { status: "Form saved!", code: 201 }
        })
        cy.get("form").submit()
        cy.contains("Form saved!").should('not.be.visible')
    })
    it("Can fill the form widouth text", () => {
        cy.get('input[name="name"]').type("Vucko").should("have.value", "Vucko")
        cy.get('input[name="email"]')
            .type("vucko@gmail.com")
            .should("have.value", "vucko@gmail.com")
        cy.server();
        cy.route({
            url: "/users/**",
            method: "POST",
            response: { status: "Form saved!", code: 201 }
        })
        cy.get("form").submit()
        cy.contains("Form saved!").should('be.visible')
    })
});
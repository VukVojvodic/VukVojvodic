describe("Register testovi", () => {
    //Register deo sa opcijama, molim da se pročita ceo komentar
    it("Register popunjen", () =>{
        cy.visit("/")
        cy.get('a[href="/register"]').click()
        cy.get('#first-name').type('Vuk')
        cy.get('#last-name').type('Vojvodić')
        cy.get('#email').type('vuk.vojvodic021@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('#password-confirmation').type('12345678')
        cy.get('.form-check-input').click()
        //cy.get('button').click()      //prvi put kad se pokreće ceo program treba da se skinu 
        //komentari (=> // <=) ispred cy, da bi posle registracije login mogao da radi u 
        //daljim testovima.
        //!!!Za sada pošto je domaći bio samo register bez asertacija netreba dirati ništa!!!
        //!!!Imajte u vidu da celokupan "Register popunjen" test može da se pokrene samo jedamput
        //zbog jedinstvenog email-a!!!
    })
    //Prazan register test
    it("Empty register", () =>{
        cy.visit("/register")
        cy.get('a[href="/register"]').click()
        cy.get('button').click()
    })
    //Nema first name popunjen
    it("Empty Register FN", () =>{
        cy.visit("/")
        cy.get('a[href="/register"]').click()
        cy.get('#last-name').type('Vojvodić')
        cy.get('#email').type('vuk.vojvodic021@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('#password-confirmation').type('12345678')
        cy.get('.form-check-input').click()
        cy.get('button').click()
    })
    //Nema last name popunjen
    it("Empty Register LN", () =>{
        cy.visit("/")
        cy.get('a[href="/register"]').click()
        cy.get('#email').type('vuk.vojvodic021@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('#password-confirmation').type('12345678')
        cy.get('.form-check-input').click()
        cy.get('button').click()
    })
    //Nema email popunjen
    it("Empty Register EML", () =>{
        cy.visit("/")
        cy.get('a[href="/register"]').click()
        cy.get('#first-name').type('Vuk')
        cy.get('#last-name').type('Vojvodić')
        cy.get('#password').type('12345678')
        cy.get('#password-confirmation').type('12345678')
        cy.get('.form-check-input').click()
        cy.get('button').click()
    })
    //Nema password popunjen
    it("Empty Register PW", () =>{
        cy.visit("/")
        cy.get('a[href="/register"]').click()
        cy.get('#first-name').type('Vuk')
        cy.get('#last-name').type('Vojvodić')
        cy.get('#email').type('vuk.vojvodic021@gmail.com')
        cy.get('#password-confirmation').type('12345678')
        cy.get('.form-check-input').click()
        cy.get('button').click()
    })
    //Nema password konfirmaciju popunjenu
    it("Empty Register PW_C", () =>{
        cy.visit("/")
        cy.get('a[href="/register"]').click()
        cy.get('#first-name').type('Vuk')
        cy.get('#last-name').type('Vojvodić')
        cy.get('#email').type('vuk.vojvodic021@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('.form-check-input').click()
        cy.get('button').click()
    })
    //Nema terms and conditions popunjen
    it("Empty Register F_C_I", () =>{
        cy.visit("/")
        cy.get('a[href="/register"]').click()
        cy.get('#first-name').type('Vuk')
        cy.get('#last-name').type('Vojvodić')
        cy.get('#email').type('vuk.vojvodic021@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('#password-confirmation').type('12345678')
        cy.get('button').click()
    })
    //Login deo posle potpune registracije!!!
    //Ako se hoće testirati register u fulu treba skinuti // gore kod "Register popunjen" testa
    //i otkloniti /** na početku "Login" testa i */ na kraju "Logout" testa!!!
    /**it("Login", () =>{
        cy.visit("/")
        cy.get('a[href="/login"]').click()
        cy.get('#email').type('vuk.vojvodic021@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('button').click()
        cy.get(".nav-link").should("have.length",4)
    })
    it("Logout", () =>{
        cy.visit("/")
        cy.get('a[href="/login"]').click()
        cy.get('#email').type('vuk.vojvodic021@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('button').click()        
        cy.get(".nav-link").should("have.length",4)
        cy.get(".nav-link").eq(3).click()
    })*/
})
/// <reference types="cypress" />
/// <reference types="../support" />

describe('Todo list - Cypress test', function () {
  let TODO_ITEM_ONE = 'buy some cheese'
  let TODO_ITEM_TWO = 'feed the cat'
  let TODO_ITEM_THREE = 'book a doctors appointment'

  beforeEach(function () {
    cy.visit('/')
    cy.contains('todos')
  })

  afterEach(() => {
    cy.window().then((win) => {
      win.document.activeElement.blur()
    })
  })

  it('Add 2 items', function () {
    cy.get('.new-todo')
      .type('Learn testing applications{enter}')
      .type('with Cypress{enter}')
      .type('the easy way!{enter}')
    cy.get('.todo-list li').should('have.length', 3)
  })

  context('When page is initially opened', function () {
    it('focus should be on the todo input field', function () {
      cy.focused().should('have.class', 'new-todo')
    })
  })

  context('When there are no Todos', function () {
    it('#main and #footer should be hiden', function () {
      cy.get('.todo-list li').should('not.exist')
      cy.get('.main').should('not.exist')
      cy.get('.footer').should('not.exist')
      cy.contains('todos')
    })
  })

  context('Todo testing:', function () {
    it('Should allow me to add todo items', function () {
      cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')
      cy.get('.todo-list li').eq(0).find('label').should('contain', TODO_ITEM_ONE)
      cy.get('.new-todo').type(TODO_ITEM_TWO).type('{enter}')
      cy.get('.todo-list li').eq(1).find('label').should('contain', TODO_ITEM_TWO)
    })
    it('Adds items', function () {
      cy.get('.new-todo')
        .type('todo A{enter}')
        .type('todo B{enter}')
        .type('todo C{enter}')
        .type('todo D{enter}')
      cy.get('.todo-list li').should('have.length', 4)
    })
    it('Should clear text input field when an item is added', function () {
      cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')
      cy.get('.new-todo').type(TODO_ITEM_TWO).type('{enter}')
      cy.get('.new-todo').should('have.text', '')
    })
    it('Append new items to the bottom of the list', function () {
      cy.createDefaultTodos().as('todos')
      cy.get('.todo-count').contains('3 items left')
      cy.get('@todos').eq(0).find('label').should('contain', TODO_ITEM_ONE)
      cy.get('@todos').eq(1).find('label').should('contain', TODO_ITEM_TWO)
      cy.get('@todos').eq(2).find('label').should('contain', TODO_ITEM_THREE)
    })
    it('Trim text input - remove blank spaces atound text', function () {
      cy.createTodo(`    ${TODO_ITEM_ONE}    `)
      cy.get('.todo-list li').eq(0).should('have.text', TODO_ITEM_ONE)
    })
    it('#main and #footer should show when items added', function () {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get('.main').should('be.visible')
      cy.get('.footer').should('be.visible')
    })
  })

  context('Mark all as completed testing:', function () {
    beforeEach(function () {
      cy.createDefaultTodos().as('todos')
    })
    it('Button allows me to mark all items as completed', function () {
      cy.get('.toggle-all').check()
      cy.get('@todos').eq(0).should('have.class', 'completed')
      cy.get('@todos').eq(1).should('have.class', 'completed')
      cy.get('@todos').eq(2).should('have.class', 'completed')
    })
    it('Same button allows me to clear the complete state of all items', function () {
      cy.get('.toggle-all').check().uncheck()
      cy.get('@todos').eq(0).should('not.have.class', 'completed')
      cy.get('@todos').eq(1).should('not.have.class', 'completed')
      cy.get('@todos').eq(2).should('not.have.class', 'completed')
    })
    it('Complete all checkbox should update state when items are completed / cleared', function () {
      cy.get('.toggle-all').as('toggleAll').check().should('be.checked')
      cy.get('.todo-list li').eq(0).as('firstTodo').find('.toggle').uncheck()
      cy.get('@toggleAll').should('not.be.checked')
      cy.get('@firstTodo').find('.toggle').check()
      cy.get('@toggleAll').should('be.checked')
    })
  })

  context('Item testing:', function () {
    it('Button should allow me to mark items as complete', function () {
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')
      cy.get('@firstTodo').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('have.class', 'completed')
    })
    it('Button should allow me to un-mark items as complete', function () {
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')
      cy.get('@firstTodo').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')
      cy.get('@firstTodo').find('.toggle').uncheck()
      cy.get('@firstTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')
    })
    it('DobleClick should allow me to edit an item', function () {
      cy.createDefaultTodos().as('todos')
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()
      cy.get('@secondTodo').find('.edit').clear().type('buy some sausages or').type('{enter}')
      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain', 'buy some sausages or')
      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })
  })

  context('Editing items test:', function () {

    beforeEach(function () {
      cy.createDefaultTodos().as('todos')
    })

    it('Doubleclick should hide other controls when editing', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()
      cy.get('@secondTodo').find('.toggle').should('not.be.visible')
      cy.get('@secondTodo').find('label').should('not.be.visible')
    })
    it('App should save edits on blur', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()
      cy.get('@secondTodo').find('.edit').clear().type('buy some sausages').blur()
      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain', 'buy some sausages')
      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })
    it('App should trim entered text', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()
      cy.get('@secondTodo').find('.edit').clear().type('    buy some sausages or    ').type('{enter}')
      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain', 'buy some sausages or')
      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })
    it('App should remove the item if an empty text string was entered', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()
      cy.get('@secondTodo').find('.edit').clear().type('{enter}')
      cy.get('@todos').should('have.length', 2)
    })
    it('App should cancel edits on escape', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()
      cy.get('@secondTodo').find('.edit').clear().type('foo{esc}')
      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@todos').eq(1).should('contain', TODO_ITEM_TWO)
      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })
  })

  context('Counter test:', function () {
    it('Counter should display the current number of todo items', function () {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get('.todo-count').contains('1 item left')
      cy.createTodo(TODO_ITEM_TWO)
      cy.get('.todo-count').contains('2 items left')
    })
  })

  context('Clear completed button', function () {
    beforeEach(function () {
      cy.createDefaultTodos().as('todos')
    })

    it('List should display the correct text', function () {
      cy.get('@todos').eq(0).find('.toggle').check()
      cy.get('.clear-completed').contains('Clear completed')
    })
    it('Button should remove completed items when clicked', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.clear-completed').click()
      cy.get('@todos').should('have.length', 2)
      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@todos').eq(1).should('contain', TODO_ITEM_THREE)
    })
    it('List should be hidden when there are no items that are completed', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.clear-completed').should('be.visible').click()
      cy.get('.clear-completed').should('not.exist')
    })
  })

  context('Persistence test:', function () {
    it('List should persist its data after reload', function () {
      function testState() {
        cy.get('@firstTodo').should('contain', TODO_ITEM_ONE).and('have.class', 'completed')
        cy.get('@secondTodo').should('contain', TODO_ITEM_TWO).and('not.have.class', 'completed')
      }
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')
      cy.get('@firstTodo').find('.toggle').check().then(testState).reload().then(testState)
    })
  })

  context('Routing test:', function () {
    beforeEach(function () {
      cy.createDefaultTodos().as('todos')
    })

    it('Button should allow me to display active items', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.filters').contains('Active').click()
      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@todos').eq(1).should('contain', TODO_ITEM_THREE)
    })
    it('List should respect the back button', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.filters').contains('Active').click()
      cy.get('.filters').contains('Completed').click()
      cy.get('@todos').should('have.length', 1)
      cy.go('back')
      cy.get('@todos').should('have.length', 2)
      cy.go('back')
      cy.get('@todos').should('have.length', 3)
    })
    it('Buton should allow me to display completed items', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.filters').contains('Completed').click()
      cy.get('@todos').should('have.length', 1)
    })
    it('Button should allow me to display all items', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.filters').contains('Active').click()
      cy.get('.filters').contains('Completed').click()
      cy.get('.filters').contains('All').click()
      cy.get('@todos').should('have.length', 3)
    })
    it('List should highlight the currently applied filter', function () {
      cy.get('.filters').within(function () {
        cy.contains('All').should('have.class', 'selected')
        cy.contains('Active').click().should('have.class', 'selected')
        cy.contains('Completed').click().should('have.class', 'selected')
      })
    })
  })

  context('Contrast test:', () => {
    it('List has good contrast when empty', () => {
      cy.addAxeCode()
      cy.checkA11y(null, {
        runOnly: ['cat.color'],
      })
    })
    it('List has good contrast with several todos', () => {
      cy.addAxeCode()
      cy.get('.new-todo').type('learn testing{enter}').type('be cool{enter}')
      cy.get('.todo-list li').should('have.length', 2)
      cy.checkA11y(null, {
        runOnly: ['cat.color'],
      })
      cy.get('.todo-list li').first().find('.toggle').check()
      cy.get('.todo-list li').first().should('have.class', 'completed')
      cy.checkA11y(null, {
        runOnly: ['cat.color'],
      })
    })
  })
})

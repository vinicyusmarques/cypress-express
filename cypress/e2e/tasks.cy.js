/// <reference types="cypress" />

describe('tasks', () => {

    let testData;

    before(() => {
        cy.fixture('tasks').then(task => {
            testData = task
        })
    })

    context('register', () => {
        it('must register a new task', () => {

            const taskName = 'Ler um livro de node.js'

            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
            cy.contains('main div p', taskName)
                .should('be.visible')
        })

        it('must not register duplicate task', () => {

            const task = testData.dup

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it('required Fields', () => {
            cy.createTask()
            cy.isRequired()
        })
    })

    context('update', () => {
        it('must complete a task', () => {

            const task = {
                name: 'Comprar ketchup',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.wait(500)

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('delete', () => {
        it('must delete a task', () => {

            const task = {
                name: 'Estudar Cypress',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.wait(500)

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})
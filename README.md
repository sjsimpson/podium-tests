## Tests for Podium Widget

Test plan for the tests in this repo can be found [here](https://docs.google.com/spreadsheets/d/1ggurX4hfnNULrsUbcqfgGwTUDlWazZ2Hus-057n4DNY/edit?usp=sharing).

There are 2 options to run these tests locally:

1. Using Docker
2. Using Cypress or Cypress GUI

### Run using Docker

1. Ensure you have docker and docker-compose installed on your machine.
2. Clone this repo using `git clone https://github.com/sjsimpson/podium-tests.git`
3. Run `docker-compose up`

The tests will run in a Docker container, with the output shown in your terminal

### Run using Cypress or Cypress GUI

From what I understand, Podium uses Cypress, so this should be pretty straightforward.

1. Clone this repo using `git clone https://github.com/sjsimpson/podium-tests.git`
2. Install dependecies with `yarn install` (or `npm install`)
3. Run `yarn cypress:run` to run tests locally, or `yarn cypress:open` to open GUI

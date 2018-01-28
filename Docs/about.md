# Crypto coin ticker and dashboard portal

## Problem statement:

Create a simple cryptocoin ticker and dashboard portal with the following functions:

- Goals:
  - Integrate with open APIs like coinmarketcap.com, poloniex, etc
  - Pick 10 coins of choice
  - Show near-real-time movement of the coins (only value)
  - Show the visualization of 2-3 periods [1 day, 1 week, 1 month etc]
  - Store data that is fetched in a DB
  - Derive metrics from the stored data [e.g. peak to peak comparison in 24 hours, simple movie average over the period, candle stick representation for the chosen periods etc]

- Stretch Goals:
  - Allow user to create a portfolio of coins of choice; users should be able to sign up and login
  - User should be able to the value of their portfolio as per current market prices. User should be indicated whether the value moved up or down along with his percentage returns.
  - Convert this to an equivalent iOS app

## Project tasks:

- Obtain one time historical data from the coinmarketcap API and update the database
- Set up a cron job to run a database update script every night to keep the database up-to-date with minute-wise data for the corresponding day.
- Present real time data in the form of both:
  - A graph
  - A live ticker
- Provide the public user with a login and sign up option.
- Allow a signed in user to create and edit a portfolio of coins.
- Let the user view different analytics on the historical data for each coin or even for his/her portfolio(signed in user only).


The use cases / user stories may be found at the project's [Issues page](https://github.com/shubhamzanwar/cryptocoin-folio/issues)

## Entity Relationship(ER) Diagram

![ER Diagram](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/er.jpg)

## Use Case Diagrams:

![Alt text](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/usecaseDiagram.png)

## Architecture Diagram:

![Alt text](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/architechtureDiagram.png)

The above diagram depicts the various systems involved in the project and how they are connected.

## Wireframes

### homepage:

![Alt text](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/homepage.png)

### login page:

![Alt text](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/login.png)

### sign up page:

![Alt text](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/register.png)

### View Portfolio page:

On this one, the team remains undecided

View portfolio1:

![Alt text](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/viewportfolio1.png)

View portfolio2:

![Alt text](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/viewportfolio2.png)

### Edit portfolio page:

![Alt text](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/editportfolio.png)

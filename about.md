# Cryptocurrency Portfolio | Documentation 

## Project Scope

Create a simple cryptocoin ticker and dashboard portal with the following functions:

* Goals
  * Integrate with open API (CryptoCompare, Poloniex etc).
  * Show details of 10 coins.
  * Show near-real-time movement of the coins (only value).
  * Show the visualization of 2-3 periods (1 day, 1 week, 1 month etc).
  * Store data that is fetched in a Database.
  * Derive metrics from the stored data like:
    * Peak to peak comparison in 24 hours.
    * Simple movie average over the period.
    * Candle stick representation for the chosen periods.
* Stretch Goals
  * Allow user to create a portfolio of coins of choice.
    * Users should be able to login and see the value of their portfolio as per current market prices.
  * Convert this to an equivalent iOS app.
    
## Use Cases

* Obtain Data from selected API:
  * Pull data every 3-5 seconds for near-real-time movement of values.
  * Pull data every night to store in database for historical use.
  * Pull data only once for collecting historical data (say past 3 months).
* Show near-real-time data movement in the form of:
  * Graph.
  * Ticker.
* Show historical data in the form of graph.
*	Allow the user to sign up and create his/her portfolio on the app.
*	Display the value and movement of value of the user's portfolio.
*	Allow the user to edit the composition of the portfolio.

## Workflow

#### Obtain Data from selected API:

* Obtain data from selected API.
  * Pull data every 3-5 seconds for near-real-time movement of values:
  When a user want to view near-real-time value of the coins then 
  an API call will be triggered which will fetch values for every 3 - 5 seconds.
  This data will not be stored in the database.
  * Pull data every night to store in database for historical use: 
  Every night around 12 AM an event will fetch data of whole day having 1 minute time interval and will be stored in the database
  This data will be used for historical data analysis.
  * Pull data only once for collecting historical data (say past 3 months): 
  In the initial stage to build historical data database, an API call will be made only once in a lifetime and all the obtained data will be stored in a database.

#### Show near-real-time data:

  * Graph: 
    * Get data from API
    * Plot the obtained data for a desired interval of time on a graph.
    * Two options: Simple Moving Averages and Japanese Candlesticks.
    * 2 - 3 periods: 1 minute, 1 hour, 1 day.
  * Ticker:
    * Get data from API
    * Display a live ticker beside the graph to show the movement of values of the cryptocoins.
    * Sort them in either descending/ascending order of their values.

#### Show historical data in the form of graph

* Fetch data from the database.
* Plot the obtained data for a desired interval of time on a graph.
* Two options: Simple Moving Averages and Japanese Candlesticks.
* 2 - 3 periods: 1 day, 1 month.

#### Allow the user to sign up and create his/her portfolio on the app:

* Provide a signup button to direct the user to the signup page 
* At the signup page, let the user choose a unique username and set a password.
* Once this is done, allow the user to make their portfolio. They can add coins from the 10 coins provided and adjust the volume they want to include in their portfolio.
* This portfolio can be edited later too.

#### Display the value and movement of value of the user's portfolio:

* Once the user is signed in, the graph should display the same metrics (simple moving average or candlesticks) for the user's portfolio.
* The live ticker on the side can be sorted by displaying the data in descending order of the impact they have on the total value of the user's portfolio. (important parameter: volume*changeInValue)

#### Allow the user to edit the composition of the portfolio:

* Allow the user to navigate to a portfolio "page".
* Here, they can view their current composition of the portfolio.
* Allow an edit button that switches the app into edit mode.
* In this mode, the users can change the volume for each coin, add or remove a coin.
* Finally, they are provided the choice of either saving or cancelling the changes they have made.

# Architecture Diagram

![picture alt](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/architechtureDiagram.png "Architechture Diagram")

# Wireframes

#### Home Page:

![picture alt](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/homepage.png "Home Page")

#### Login Page:

![picture alt](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/login.png "Login Page")

#### Signup Page:

![picture alt](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/register.png "Signup Page")

#### View Portfolio Page:

* First Layout
![picture alt](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/viewportfolio1.png "View Portfolio")

* Second Layout
![picture alt](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/viewportfolio2.png "View Portfolio")

#### Edit Portfolio Page:

![picture alt](https://github.com/shubhamzanwar/cryptocoin-folio/blob/master/Docs/images/wireframes/editportfolio.png "Edit Portfolio")

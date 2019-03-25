# Lunchbox Survey
Website and API for Lunchbox Survey

To run the full app:
* `npm run full-install`
* `npm start`
* Make sure you have a mongodb server running on `localhost:27017` (may need to add a database called `lunchbox-survey` as well)

## API

### index.js
Entry point for server

### configs/app-settings.js
Contains the connection strings. Ideally would have more environment specific configs as well.

### routes/index.js
Contains all of the open API routes. These could be separated further into controllers specific for each model (`surveys`, `surveyResponses`).

### models
Contains the database schemas.

## APP

### Components
Contains the definitions for all of the components used throughout the app.

#### App.js
Navbar and routing

#### survey
All of the components for the `/` and `/survey/:id` routes are here. There is the `SurveyHome.js` for showing a list of all surveys. Clicking on a survey brings you to `SurveyForm.js`. This component allows you to step through the questions in the survey.

### surveyor
Has all the surveyor related components. `SurveyorHome.js` lists all of the surveys and has a button for creating new surveys in `CreateSurvey.js`. The `response` folder contains everything used for displaying the survey responses. The `SurveyResponseList.js` component shows the responses in a list that can be clicked to show each response in detail. The `SurveyResponseOverview.js` component shows all the questions with a quick overview of their total responses.

### actions
This folder has all of the actions that can be dispatched. They are separated by the API route that they are calling. Each action does the following:
* Dispatch `REQUEST` to let listeners know a request is in progress
* If the request is a success, dispatch a `SUCCESS` to pass back data
* If the request fails, dispatch an `ERROR` to have a listener handle the error and possibly toast to the user

### reducers
Reducers are separated in the same way as the actions. The `index.js` uses `combineReducers`.

### constants
Contains some constant type variables.
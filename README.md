## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## Notes

### State management

Instead of opting for something like Redux, I decided to use the native `useReducer` to manage state and kept all of it in a single reducer for simplicity.

## Improvements

### `State machine` vs `useReducer`

I feel that this kind of app would be a good usecase for a state machine, but I used a `reducer` since I'm more comfortable with it and knew I would be able to finish on the deadline I'd set.

### Tests

Usually I like to write some tests that test actual user behaviour, but I only added a couple of unit tests mainly due to lack of time.

### Loading Indicator vs Skeleton Component

Another improvement would be to have a skeleton placeholder component instead of a plain loading indicator.
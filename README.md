# What is React Testing Library?

In this lesson, you will learn how to test your React components with the React Testing Library (RTL). React Testing Library is a UI-layer testing framework that helps us ensure that our React components are rendering and behaving properly.

The main advantages of RTL over other UI-layer testing frameworks are:

- It is built explicitly for testing React components.
- It allows us to test our components in a way that mimics real user interactions.

The logic behind this is that a user will not care about the implementation details of a React component such as the component’s state, the props passed to it, etc. The user will only care about whether or not they are able to use the app. We should test our application with these same motivations.

Before we jump into the lesson, let’s take a quick look at an example that shows off the power and elegance of the React Testing Library.

Take a moment to observe the code sample below. It shows a GroceryList component with a few items. You can click on the checkboxes to mark that you’ve added one of these items to your cart. You can see the code for this component in the file GroceryList.js.

```jsx
const GroceryList = () => {
  return (
    <div>
      <h1>Grocery List</h1>
      <ul>
        <li>
          <label htmlFor="item1">Apples</label>
          <input type="checkbox" id="item1" />
        </li>
        <li>
          <label htmlFor="item2">Milk</label>
          <input type="checkbox" id="item2" />
        </li>
        <li>
          <label htmlFor="item3">Cereal</label>
          <input type="checkbox" id="item3" />
        </li>
      </ul>
    </div>
  );
};

export default GroceryList;
```

Next, let’s look at a unit test using RTL. Observe how it mimics a user clicking the first checkbox:

```jsx
import { render, screen, cleanup } from "@testing-library/react";
import GroceryList from "./components/GroceryList";
import userEvent from "@testing-library/user-event";

test("should mark the first checkbox as checked", () => {
  // render the grocery list
  render(<GroceryList />);
  // grab the apple item
  const appleItem = screen.getByLabelText("Apples");
  // simulate a "click" on the apple checkbox
  userEvent.click(appleItem);
  // assert that the apple checkbox was checked
  expect(appleItem).toBeChecked();
});
```

Can you see how we are able to test the `GroceryList` component without knowing any of its implementation details? This is what makes RTL so powerful. We can test our React components as if we are a real user and not worry about the specific logic that went behind coding them.

Don’t worry if you cannot understand every single line of the code snippet above. In the upcoming exercises, we will cover RTL so that you can understand everything that’s going on.

---

# Setting up React Testing Library

In order to use React Testing Library, we will need to include the `@testing-library/react` package in our project by using yarn like so:

```
yarn add -D @testing-library/react@latest 
```

Once we have added `@testing-library/react` to our project, we can import the two essential values, `render` and `screen`, into our tests.

- `render()` is a function that we can use to virtually render components and make them available in our unit tests. Similar to `ReactDOM.render()`, RTL’s `render()` function takes in JSX as an argument.

- `screen` is a special object which can be thought of as a representation of the browser window. We can make sure that our virtually rendered components are available in the test by using the `screen.debug()` method which prints out all the DOM contents.

The `screen` object has a few other useful methods that we’ll cover in the upcoming exercises but for now, let’s look at an example.

Look at the code snippet below, it shows the output of a unit test that prints out the DOM contents of the `Greeting` component.

```jsx
import { render, screen } from '@testing-library/react'

const Greeting = () => {
  return (<h1>Hello World</h1>)
};

test('should prints out the contents of the DOM', () => {
    render(<Greeting />);
    screen.debug();
});

// Output:
<body>
  <div>
    <h1>
      Hello World
    </h1>
  </div>
</body>
```

After importing the `render` and `screen` values from `'@testing-library/react'`, a test is created using the `test()` function from the Jest testing framework. Inside, the `<Greeting>` component is virtually rendered and then the resulting virtual DOM is printed via the `screen.debug()` method.

Notice how the output shows the rendered contents of `<Greeting>` (an `<h1>` element) and not the component itself. As was mentioned in the first exercise, React Testing Library strives to produce a testing environment that is as close to the user’s experience as possible.

---

Now, let’s get started with testing the Passing Thoughts application!
## Exercise

1. To verify that you have successfully added the package to your project, navigate to `package.json` and check that `"@testing-library/react"` appears in the `"devDependencies"` array.

2. Create `Thought.test.js` file and import `render()` and `screen` from @testing-library/react.

3. Now, let’s try rendering the `<Thought />` component in our test. Inside the provided `test()` in `Thought.test.js` call the `render()` function and pass in the `<Thought />` component. The `<Thought />` component expects 2 props:

   - `thought`: use the provided thought object
   - `removeThought`: pass an empty function () => {}

4. Now, after the call to `render()`, call `screen.debug()` to see the rendered component.

5. In your terminal, run the `yarn test` command to run the test. What do you see?
   
---

# Querying with RTL

Now that we know how to set up RTL, we can finally start testing our React components. To do so, we first have to query for and extract the DOM nodes from our virtually rendered components. Then, we can check and see if the extracted DOM nodes were rendered as expected. Fortunately for us, RTL has many built-in query methods that greatly simplify this process. In this exercise, we will cover the `.getByX` query methods.

There are a number of `.getByX` query methods to choose from and they are all accessible as methods on the screen object. Look at the example below, the `.getByText()` method is used to extract a DOM element with text that matches a specified string.

```jsx
import { render, screen } from "@testing-library/react";

const Button = () => {
  return (
    <button type="submit" disabled>
      Submit
    </button>
  );
};

test('A "Submit" button is rendered', () => {
  // Render the Button component
  render(<Button />);
  // Extract the <button>Submit</button> node
  const button = screen.getByText("Submit");
});
```

Similarly, another method is `.getByRole()` that allows us to extract a DOM node by its role type. Look at the example below, it shows us another way we can query for the `<button>` element using `.getByRole()`.

```jsx
import { render } from "@testing-library/react";

const Button = () => {
  return (
    <button type="submit" disabled>
      Submit
    </button>
  );
};

test("extracts the button DOM node", () => {
  // Render the Button component
  render(<Button />);
  // Extract the <button>Submit</button> node
  const button = screen.getByRole("button");
});
```

RTL has a bunch of these `.getByX` methods, but instead of memorizing them all, it is best to look at the [docs](https://testing-library.com/docs/queries/about/) to find the one that best suits your needs.

Now that we know how to query DOM nodes, we can test them using [Jest assertions](https://jestjs.io/docs/expect). Recall that in the first exercise we saw the assertion `expect.toBeChecked()`. This isn’t part of the regular set of Jest matchers, but instead is an extension provided by the `testing-library/jest-dom` library.

You can install this library using the command `npm install --save-dev @testing-library/jest-dom`. The entire library can then be imported into our test file like so:

```jsx
import "@testing-library/jest-dom";
```

Here is an example of the `expect.toBeDisabled()` matcher being used to test a DOM node extracted with the `screen.getByRole()` method.

```jsx
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

const Button = () => {
  return (
    <button type="submit" disabled>
      Submit
    </button>
  );
};

test("should show the button as disabled", () => {
  // render Button component
  render(<Button />);
  // Extract <button>Submit</button> Node
  const button = screen.getByRole("button");
  // Assert button is disabled
  expect(button).toBeDisabled();
});
```

Once again, there are many different jest matchers. In this lesson we’ll get a chance to see a number of the most common ones, however, instead of memorizing all of them, it is best to just follow the [jest-dom docs](https://github.com/testing-library/jest-dom).

---
## Exercise

1. Let’s start making assertions on the Passing Thoughts application. First, install the `@testing-library/jest-dom` library as a developer dependency.

2. In Thought.test.js import the @`testing-library/jest-dom` library.

3. Let’s start by confirming that the static header element with the text “Passing Thoughts” is rendered when the App component is rendered. First, we’ll grab the element using query methods.

   - In the first test of the Thought. test.js file, below the call to `render(<App/>)`:
   - Use the `.getByText()` method from the `screen` object to extract the header node of the `App` component.
   - Assign the returned node to a variable called header.

4. Within the first test, call the `expect().toHaveTextContent()` assertion to confirm that the header node does indeed contain the text `'Passing Thoughts'`.

5. Now, let’s write some tests for the `Thought` component which gets rendered each time the user writes down a new thought. Take a look at app rendered in the browser and try adding a new thought. Notice that an ‘×’ button gets rendered for removing that thought. Let’s confirm that this ‘×’ button gets rendered using the `.getByRole()` query method.

   In the second test of the `Thought.test.js` file, below the call to `render(<Thought .../>)`:

- Use the `.getByRole()` method from `screen` to extract the button node of the `Thought` component.
- Assign the button node to a variable named button.

6. Now, we could just test to see if the button was rendered using the `expect().toBeInTheDocument()` matcher, but for the sake of variety, let’s test to see if the button is “enabled”.

   Use the [docs](https://github.com/testing-library/jest-dom#custom-matchers) to find the appropriate jest assertion for this. Then, below your query for the button node, use a jest assertion to check if the button is enabled.

7. Well done! Let’s run our tests and confirm that our application is working properly. Run `npm test` in your terminal and you should see two passing tests!

   (Optional) To see what happens when the tests fail, try changing a few things:

- In the first test, change your `expect().toHaveTextContent` assertion to:

  ```
  expect(header).toHaveTextContent('Hello World');
  ```

- In the second test, change your .toBeEnabled() matcher to .toBeDisabled()
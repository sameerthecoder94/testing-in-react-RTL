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
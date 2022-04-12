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
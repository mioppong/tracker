import React from "react";
import MainRoute from "./routes/MainRoute";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

//WE NEED THIS LINE TO BE ABLE TO HAVE REDUX
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MainRoute />
    </Provider>
  );
}

import { Provider } from "react-redux";
import "./App.scss";
import store from "./utils/store";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div data-testid="app-root">
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;

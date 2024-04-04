import { Provider } from "react-redux";
import Body from "./components/Body.js";
import appStore from "./utils/appStore.js";

//Note:I can provide redux store i.e. appStore to our body by using "Provider"
function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;

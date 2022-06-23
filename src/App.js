import { Provider } from "./state/Context";
import Map from "./components/Map";

export default function App() {
  return (
    <Provider>
      <Map />
    </Provider>
  );
}

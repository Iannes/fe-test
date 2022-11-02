import { AppRouter } from "./components/AppRouter";
import { StepperProvider } from "./lib/contexts/Stepper";
import "./App.css";

function App() {
  return (
    <StepperProvider>
      <AppRouter />
    </StepperProvider>
  );
}

export default App;

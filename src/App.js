import { Route, Redirect, Switch } from "react-router-dom";
import Calendar from "./features/Calendar/Calendar";
import HabitTracker from "./features/HabitTracker/HabitTracker";
import Layout from "./features/Layout";
import TaskManager from "./features/TaskManager/TaskManager";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/tasks" />
        </Route>
        <Route path="/tasks" exact>
          <TaskManager />
        </Route>
        <Route path="/calendar" exact>
          <Calendar />
        </Route>
        <Route path="/habits" exact>
          <HabitTracker />
        </Route>
        <Route path="*">
          <Redirect to="/tasks" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import Layout from './app/components/Layout';
import Home from './app/pages/Home';
import NotFound from './app/pages/NotFound';
import TaskTimeDiscrepanciesGroups from './app/pages/TaskTimeDiscrepanciesInGroups';
import TaskTimeDiscrepanciesProjects from './app/pages/TaskTimeDiscrepanciesInProjects';
import UserTaskTimeDiscrepancies from './app/pages/UserTaskTimeDiscrepancies';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout title="Jira Metrics" />}>
        <Route index element={<Home />} />
        <Route path="TaskTimeDiscrepanciesInGroups" element={<TaskTimeDiscrepanciesGroups />} />
        <Route path="TaskTimeDiscrepanciesInProjects" element={<TaskTimeDiscrepanciesProjects />} />
        <Route path="UserTaskTimeDiscrepancies" element={<UserTaskTimeDiscrepancies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

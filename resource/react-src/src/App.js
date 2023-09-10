import '@/App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import MainLayout from '@/pages/MainLayout';
import Record from '@/pages/Record';
import Home from './pages/Home';
import Admin from './pages/Admin';

const App = () => {
  return (
    <div>
      <Router>
        <div className='App'>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/record" element={<Record />}> </Route>
            <Route path="/admin" element={<Admin />}> </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        </div >
      </Router>
    </div>
  );
};

export default App;

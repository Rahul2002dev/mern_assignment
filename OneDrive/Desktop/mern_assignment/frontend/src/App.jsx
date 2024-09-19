import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './components/Admin';
import Login from './components/login';
import Edit from './components/Edit';
// import CreateList from './components/CreateList';
import MainCreateListFunc from './components/MainCreateListFunc';
import EmployeeList from './components/EmployeeList';
function App() {
  const [count, setCount] = useState(0);

  const isAuthenticated = () => {
    return !!localStorage.getItem('user');
  };
  return (
      <Router>
        <Routes>
       <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/Admin" /> : <Login />}
        />
         <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/Edit/:id"
          element={<Edit />}
        />
        <Route
          path="/Admin"
          element={isAuthenticated() ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/MainCreateListFunc"
          element={isAuthenticated() ? <MainCreateListFunc /> : <Navigate to="/login" />}
        />
        <Route
          path="/EmployeeList"
          element={isAuthenticated() ? <EmployeeList /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App

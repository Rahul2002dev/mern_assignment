// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link,Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Edit from './Edit';
import MainCreateListFunc from './MainCreateListFunc';
import Admin from './Admin';
function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:5000/employees')
      .then((response) => {
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employee data:', error));
  }, []);

  console.log(employees);

  const formatDate = (date) => {
    if (!date) return 'No Date Provided';
    const parsedDate = moment(date);
    if (!parsedDate.isValid()) {
      return 'Invalid Date';
    }
    return parsedDate.format('MM/DD/YYYY');
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/employees/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch((error) => console.error('Error deleting employee:', error));
  };

  const logoutfunc = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="w-full h-screen flex-col bg-gray-100">
      <nav className="bg-blue-600 p-4 flex justify-between w-full">
        <ul className="flex space-x-6 text-white">
          <li>
            <Link to="/Admin" className="hover:text-gray-200 transition duration-300 text-lg font-medium">Home</Link>
          </li>
          <li>
            <Link to="/EmployeeList" className="hover:text-gray-200 transition duration-300 text-lg font-medium">Employee List</Link>
          </li>
          <li>
            <Link to="/MainCreateListFunc" className="hover:text-gray-200 transition duration-300 text-lg font-medium">Create List</Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300">Profile Name</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300" onClick={logoutfunc}>Logout</button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto mt-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Employee List</h1>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">img</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Mobile NO</th>
                <th className="py-2 px-4 border-b">Designation</th>
                <th className="py-2 px-4 border-b">gender</th>
                <th className="py-2 px-4 border-b">Course</th>
                <th className="py-2 px-4 border-b">Created Date</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {
              employees.map((employee, index) => {
                
                const formattedDate = new Date(employee.createdDate).toLocaleDateString();

                return(
             <tr key={index}>
                <td className="py-2 px-4 border-b">{employee.id}</td>
                <td className="py-2 px-4 border-b"> <img 
            src={employee.img} 
            alt={employee.name} 
            className="w-16 h-16 object-cover" 
          /></td>
                  <td className="py-2 px-4 border-b">{employee.name}</td>
                  <td className="py-2 px-4 border-b">{employee.email}</td>
                  <td className="py-2 px-4 border-b">{employee.mobileNo}</td>
                  <td className="py-2 px-4 border-b">{employee.designation}</td>
                  <td className="py-2 px-4 border-b">{employee.gender}</td>
                  <td>{Object.keys(employee.Course).filter(course => employee.Course[course]).join(', ')}</td>
                  <td className="py-2 px-4 border-b">{formatDate(employee.createdDate)}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={()=>handleDelete(employee.id)}>delete</button>
                    <Link to={`/Edit/${employee.id}`} className='bg-green-300'>Edit</Link>
                    </td>
                </tr>
                );
})}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default EmployeeList;

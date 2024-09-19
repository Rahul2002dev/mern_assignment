import React from 'react'
import { Link } from 'react-router-dom'
import CreateList from './CreateList';
import Admin from './Admin';
import EmployeeList from './EmployeeList';
function MainCreateListFunc() {
    return (
        <div className="w-full h-screen flex-col bg-gray-100">
    
          <nav className="bg-blue-600 p-4 flex justify-between  w-full">
            <ul className="flex space-x-6 text-white">
              <li>
                <Link to="/" className="hover:text-gray-200 transition duration-300 text-lg font-medium">Home</Link>
              </li>
              <li>
                <Link to="/EmployeeList" className="hover:text-gray-200 transition duration-300 text-lg font-medium">Employee List</Link>
              </li>
              <li>
                <Link to ="/MainCreateListFunc" className="hover:text-gray-200 transition duration-300 text-lg font-medium">Create List</Link>
              </li>
            </ul>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300">Profile Name</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300">Logout</button>
            </div>
          </nav>
          
          <main className="flex-grow flex items-center justify-center">
          <CreateList/>
          </main>
        </div>
      );
}

export default MainCreateListFunc
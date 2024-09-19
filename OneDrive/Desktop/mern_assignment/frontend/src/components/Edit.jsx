import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
function Edit() {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        Course: {},
        img: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/employees/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFormData(data);
            })
            .catch(error => console.error('Error fetching employee data:', error));
    }, [id]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                Course: {
                    ...prev.Course,
                    [name]: checked,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const submitHandle = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                alert('Employee updated successfully');
                navigate('/EmployeeList'); // Redirect to Employee List
            })
            .catch(error => console.error('Error updating employee:', error));
    };

    const filehandlechange = (e) => {
        const file = e.target.files[0]; 
        setFormData(prev => ({
          ...prev,
          img: file, 
        }));
      };

  return (
    <div className=" w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <form onSubmit={submitHandle} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="font-semibold text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none  focus:ring-blue-500"
        />
      </div>
  
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="flex flex-col space-y-2">
        <label htmlFor="mobileNo" className="font-semibold text-gray-700">Phone</label>
        <input
          id="mobileNo"
          type="tel"
          name="mobileNo"
          value={formData.mobileNo || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="flex flex-col space-y-2">
        <label htmlFor="designation" className="font-semibold text-gray-700">Designation</label>
        <select
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
  
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-gray-700">Gender</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="form-radio"
            />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="form-radio"
            />
            <span>Female</span>
          </label>
        </div>
      </div>
  
      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-gray-700">Course</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="MCA"
              checked={formData.Course?.MCA || false}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>MCA</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="BCA"
              checked={formData.Course?.BCA || false}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>BCA</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="BSC"
              checked={formData.Course?.BSC || false}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>BSC</span>
          </label>
        </div>
      </div>
  
      <div className="flex flex-col space-y-2">
        <label htmlFor="img" className="font-semibold text-gray-700">Upload</label>
        <input
          id="img"
          type="file"
          name="img"
          onChange={filehandlechange}
          className="border border-gray-300 rounded-lg p-2"
        />
      </div>
  
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  </div>
  )
}

export default Edit
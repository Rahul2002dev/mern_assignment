import React, { useState } from 'react';

function CreateList() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    Course: { MCA: false, BCA: false, BSC: false },
    img: null,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        Course: {
          ...prevState.Course,
          [name]: checked,
        },
      }));
    } else if (type === 'radio') {
      setFormData((prevState) => ({
        ...prevState,
        gender: value, 
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  function filehandlechange(e) {
    setFormData((prevState) => ({
      ...prevState,
      img: e.target.files[0],
    }));
  }

  function submitHandle(e) {
    e.preventDefault();
    console.log('form data submitted', formData);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mobileNo', formData.mobileNo);
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('gender', formData.gender);

    const selectedCourses = Object.keys(formData.Course).filter(key => formData.Course[key]);
    formDataToSend.append('Course', selectedCourses.join(','));

    if (formData.img) {
      formDataToSend.append('img', formData.img);
    }

    fetch('http://localhost:5000/submit', {
      method: 'POST',
      body: formDataToSend,
    })
      .then(response => response.json())
      .then(data => console.log('Form data submitted successfully:', data))
      .catch(error => console.error('Error submitting form data:', error));
  }

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
  
  );
}

export default CreateList;

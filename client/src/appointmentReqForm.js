import React, { useState } from 'react';

const AppointmentReqForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    preferDate: '',
    preferTime: '',
    description: '',
    severity: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Implement form submission logic here
    console.log(formData); // Example: Log form data to console
    // Reset form fields
    setFormData({
      name: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phoneNumber: '',
      preferDate: '',
      preferTime: '',
      description: '',
      severity: ''
    });
  };

  return (
    <div className="login-card">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl text-primary font-semibold">Appointment Request</h1>
          <p className="mt-2 text-secondary">Please fill out the form below to request an appointment</p>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="relative mt-8">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="First Name"
                className="peer input-box"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="name"
                className="input-label"
              >
                First Name
              </label>
            </div>
            <div className="relative mt-8">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="peer input-box"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="lastName"
                className="input-label"
              >
                Last Name
              </label>
            </div>
            <div className="relative mt-8">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="peer input-box"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="dateOfBirth"
                className="input-label"
              >
                Date of Birth
              </label>
            </div>
            <div className="relative mt-8">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="peer input-box"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="email"
                className="input-label"
              >
                Email Address
              </label>
            </div>
            <div className="relative mt-8">
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                className="peer input-box"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="phoneNumber"
                className="input-label"
              >
                Phone Number
              </label>
            </div>
            <div className="relative mt-8">
              <input
                type="date"
                name="preferDate"
                id="preferDate"
                placeholder="Preferred Date"
                className="peer input-box"
                value={formData.preferDate}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="preferDate"
                className="input-label"
              >
                Preferred Date
              </label>
            </div>
            <div className="relative mt-8">
              <select
                name="preferTime"
                id="preferTime"
                className="peer input-box"
                value={formData.preferTime}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Preferred</option>
                <option value="Morning">Morning</option>
                <option value="Noon">Noon</option>
                <option value="After Noon">After Noon</option>
              </select>
              <label
                htmlFor="preferTime"
                className="input-label"
              >
                Preferred Time
              </label>
            </div>
            <div className="relative mt-8">
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                className="peer input-box"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="description"
                className="input-label"
              >
                Description
              </label>
            </div>
            <div className="relative mt-8">
              <select
                name="severity"
                id="severity"
                className="peer input-box"
                value={formData.severity}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <label
                htmlFor="severity"
                className="input-label"
              >
                Severity
              </label>
            </div>
            <div className="my-6">
              <button
                type="submit"
                className="button"
              >
                Request Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentReqForm;

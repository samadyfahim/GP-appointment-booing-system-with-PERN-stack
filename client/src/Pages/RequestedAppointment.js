import React, { useState } from "react";
import InputField from "../pagesComponents/inputFaild";
import axiosWithAuth from "../middelware/axiosWithAuth";

const AppointmentReqForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone_number: "",
    prefer_date: "",
    prefer_time: "",
    description: "",
    severity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { ...formData };
    const axiosInstance = axiosWithAuth();
    try {
      const response = await axiosInstance.post(
        "/api/appointment/appointmentRequestForm",
        appointmentData
      );
      console.log("Appointment request submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting appointment request:", error);
    }
    setFormData({
      name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      phone_number: "",
      prefer_date: "",
      prefer_time: "",
      description: "",
      severity: "",
    });
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl text-primary font-semibold">
            Appointment Request
          </h1>
          <p className="mt-2 text-secondary">
            Please fill out the form below to request an appointment
          </p>
        </div>
        <div className="mt-8 w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <InputField
                label="First Name"
                id="name"
                name="name"
                type="text"
                placeholder="First Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <InputField
                label="Last Name"
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              <InputField
                label="Date of Birth"
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                placeholder="Date of Birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
              />
              <InputField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
              />
              <InputField
                label="Phone Number"
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
              <InputField
                label="Preferred Date"
                id="prefer_date"
                name="prefer_date"
                type="date"
                placeholder="Preferred Date"
                value={formData.prefer_date}
                onChange={handleInputChange}
              />
              <InputField
                label="Preferred Time"
                id="prefer_time"
                name="prefer_time"
                type="select"
                placeholder="Select Preferred"
                value={formData.prefer_time}
                onChange={handleInputChange}
              >
                <option value="">Select Preferred</option>
                <option value="Morning">Morning</option>
                <option value="Noon">Noon</option>
                <option value="Afternoon">After Noon</option>
                <option value="Any">Any</option>
              </InputField>

              <InputField
                label="severity"
                id="severity"
                name="severity"
                type="select"
                placeholder="Select Preferred"
                value={formData.severity}
                onChange={handleInputChange}
              >
                <option value="">Select Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </InputField>
            </div>
            <InputField
              label="description"
              id="description"
              name="description"
              type="textarea"
              placeholder="Tell us briefly about your condition"
              value={formData.description}
              onChange={handleInputChange}
            ></InputField>

            <div className="my-6">
              <button type="submit" className="button">
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

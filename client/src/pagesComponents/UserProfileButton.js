import React, { useState, useEffect } from "react";
import axiosWithAuth from "../middelware/axiosWithAuth";
import { Avatar, Dropdown } from "flowbite-react";
import { HiCog, HiLogout, HiViewGrid } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

function UserProfileButton() {
  const [userProfile, setUserProfile] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserNameAndEmail = async () => {
      try {
        const axiosInstance = axiosWithAuth();
        const response = await axiosInstance.get("/api/user/nameAndEmail");

        const { name, email } = response.data;
        setUserProfile({ name, email });
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error occurred:", error.message);
        }
      }
    };

    getUserNameAndEmail();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { name, email } = userProfile;

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={<Avatar alt="User settings" icon={CgProfile} rounded />}
    >
      <Dropdown.Header>
        <span className="block text-sm">{name || "No Name"}</span>
        <span className="block truncate text-sm font-medium">
          {email || "No Email Provided"}
        </span>
      </Dropdown.Header>
      <Dropdown.Item icon={HiViewGrid}>Home</Dropdown.Item>
      <Dropdown.Item icon={HiViewGrid}>Profile</Dropdown.Item>
      <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

export default UserProfileButton;

import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfileButton from "../pagesComponents/UserProfileButton";
import { useAuth } from "react-auth-kit";

const UserDetails = () => {
  const auth = useAuth();
  const [userProfile, setUserProfile] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const token = getCookieValue('_auth');

  const accessToken = auth.authState.token;

  console.log(accessToken);

  useEffect(() => {
    const getUserNameAndEmail = async () => {
      try {
        console.log("Access Token:", accessToken);

        const response = await axios.get(
          "http://localhost:5000/api/user/nameAndEmail",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const { name, email } = response.data;
        setUserProfile({ name, email });
      } catch (error) {
        // Enhanced error handling
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
  }, [accessToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <UserProfileButton name={userProfile.name} email={userProfile.email} />
    </div>
  );
};

function getCookieValue(name) {
  const nameString = name + "=";
  const value = document.cookie
    .split(";")
    .find((item) => item.trim().startsWith(nameString));

  if (!value) return null;

  return value.split("=")[1];
}


export default UserDetails;

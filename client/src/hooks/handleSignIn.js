import axios from "axios";

const handleSignIn = async (formData, signIn, navigate, setError) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/login",
      formData
    );
    if (response.data.ok) {
      const { accessToken, refreshToken } = response.data;
      signIn({
        auth: {
          token: accessToken,
          type: "Bearer",
        },
        // refresh: refreshToken,
        userState: formData.email,
      });
      navigate("/Dashboard");
    }
  } catch (error) {
    if (error.response) {
      setError(error.response.data.error);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred during request setup:", error.message);
    }
  }
};

export default handleSignIn;

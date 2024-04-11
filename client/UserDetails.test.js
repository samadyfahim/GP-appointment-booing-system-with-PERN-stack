// import React from "react";
// import { render, waitFor } from "@testing-library/react";
// import axios from "axios";
// import { useAuth } from "react-auth-kit";
// import UserDetails from "../client/src/hooks/UserDetails";

// jest.mock("axios");
// jest.mock("react-auth-kit", () => ({
//   useAuth: jest.fn(),
// }));

// const mockAccessToken = "test-access-token";
// const mockedUseAuth = {
//   authState: {
//     token: mockAccessToken,
//   },
// };

// describe("UserDetails", () => {
//   beforeEach(() => {
//     useAuth.mockImplementation(() => mockedUseAuth);
//     axios.get.mockResolvedValue({
//       data: { name: "Test Name", email: "test@example.com" },
//     });
//   });

//   it("fetches user details using the access token", async () => {
//     render(<UserDetails />);

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
//         headers: {
//           Authorization: `Bearer ${mockAccessToken}`,
//         },
//       });
//     });
//   });
// });

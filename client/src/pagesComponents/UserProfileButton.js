import React from "react";

import { Avatar, Dropdown } from "flowbite-react";
import { HiCog, HiLogout, HiViewGrid } from "react-icons/hi";
function UserProfileButton() {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar
          alt="User settings"
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          rounded
        />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">
          bonnie@flowbite.com
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

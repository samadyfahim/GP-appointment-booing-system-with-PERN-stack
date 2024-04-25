import React from "react";

const InputField = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  children,
}) => {
  if (type === "select") {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <select
          id={id}
          name={name}
          className="
          bg-gray-50 border 
          border-gray-300 
          text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 
          focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 
          dark:border-gray-600 
          dark:placeholder-gray-400 
          dark:text-white 
          dark:focus:ring-blue-500 
          dark:focus:border-blue-500"
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className="
          bg-gray-50 border 
          border-gray-300 
          text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 
          focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 
          dark:border-gray-600 
          dark:placeholder-gray-400 
          dark:text-white 
          dark:focus:ring-blue-500 
          dark:focus:border-blue-500"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  } else {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className="
          bg-gray-50 border 
          border-gray-300 
          text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 
          focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 
          dark:border-gray-600 
          dark:placeholder-gray-400 
          dark:text-white 
          dark:focus:ring-blue-500 
          dark:focus:border-blue-500"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
};

export default InputField;

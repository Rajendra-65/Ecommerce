import React from "react";

const SelectComponent = ({ field,onChange}) => {
return (
    <div className=" w-full p-2 mx-2 mb-[22px]">
        <label htmlFor={field.htmlFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{field.label}</label>
        <select 
            id={field.id} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => onChange(e.target.value)}
        >
            {field.options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);
};

export default SelectComponent;

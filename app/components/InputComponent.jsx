import React from 'react'

const InputComponent = ({id,type,placeholder,label,onChange}) => {
  return (
    <div
        className='w-full'
    >
        <input 
            className='border border-blue-400 w-full p-2 mx-2 mb-[22px] rounded'
            id={id}
            type={type}
            placeholder={placeholder}
            label={label}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
  )
}

export default InputComponent
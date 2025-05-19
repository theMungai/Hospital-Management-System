import React from 'react';

const Inputs = ({label, placeholder, type, basis, name, value, onChange}) => {
  return (
      <div className={`basis-${basis}`}>
          <label>
              <span className='mb-2.5 text-[#282938] font-normal text-[19px] block '>{label}</span>
              <input name={name} value={value} onChange={onChange} type={type} required placeholder={placeholder} className='bg-transparent p-4 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full ' />
          </label>
      </div>
  );
};

export default Inputs;
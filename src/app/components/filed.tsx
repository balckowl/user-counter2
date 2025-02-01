import React, { useState, useEffect, ReactNode } from 'react';
import FiledSelect from './filed-select';
import { FaCoffee } from 'react-icons/fa';

const Filed = ({ filedName, onValueChange, maxSeats, icon, className }:
  { filedName: string, onValueChange: Function, maxSeats: number, icon?: ReactNode, className: string }) => {
  const [selectedValue, setSelectedValue] = useState('0');

  useEffect(() => {
    onValueChange(filedName, selectedValue);
  }, [selectedValue, filedName]);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
  };

  return (
    <div className={`border p-3 rounded-md ${className}`}>
      <h2 className='font-bold text-[17px] mb-[5px] flex items-center gap-2'>
        {filedName}
        {icon && icon}
      </h2>
      <FiledSelect
        initialValue={selectedValue}
        onValueChange={handleValueChange}
        maxSeats={maxSeats}
      />
    </div>
  );
};

export default Filed;

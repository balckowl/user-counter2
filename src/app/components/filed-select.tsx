import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';

interface FiledSelectProps {
    initialValue: string;
    onValueChange: (value: string) => void;
    maxSeats: number;
}

const FiledSelect: React.FC<FiledSelectProps> = ({ initialValue, onValueChange, maxSeats }) => {
    const [selectedValue, setSelectedValue] = useState<string>(initialValue);

    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
        onValueChange(value);
    };

    return (
        <Select value={selectedValue} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
                {Array.from({ length: maxSeats + 1 }, (_, value) => (
                    <SelectItem key={value} value={String(value)}>
                        {String(value)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FiledSelect;

import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

type CustomDatePickerType = {
  onChange: (selectDate: string) => void;
  label?: string;
  value?: string;
};

const CustomDatePicker = ({ onChange, label, value }: CustomDatePickerType) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(value, 'YYYY-MM-DD'));

  useEffect(() => {
    onChange(`${date?.format('YYYY-MM-DD')}`);
  }, [date]);

  return <DatePicker label={label} value={date} onChange={(selectDate) => setDate(selectDate)} />;
};

export default CustomDatePicker;

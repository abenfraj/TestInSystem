import {TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

const ChartDatePicker = ({
                             label,
                             minDate,
                             maxDate,
                             chosenDate,
                             setChosenDate
                         }) => {

    const handleChange = (newValue: Date | null) => {
        setChosenDate(newValue);
    };

    return (
        <DatePicker
            label={label}
            value={chosenDate}
            inputFormat={'dd-MM-yyyy'}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            minDate={minDate != null ? minDate : new Date('01-07-2008')}
            maxDate={maxDate != null ? maxDate : new Date()}
        />
    )
}

export default ChartDatePicker;
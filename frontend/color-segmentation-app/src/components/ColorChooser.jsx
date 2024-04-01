import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const colors = [
  { name: 'red', color: 'red' },
  { name: 'orange', color: 'orange' },
  { name: 'yellow', color: 'yellow' },
  { name: 'maroon', color: 'maroon' },
  { name: 'green', color: 'green' },
  { name: 'blue', color: 'blue' },
  { name: 'purple', color: 'purple' },
  { name: 'brown', color: 'brown' },
  { name: 'pink', color: 'pink' },
  { name: 'magenta', color: 'magenta' },
  { name: 'cyan', color: 'cyan' },
  { name: 'turquoise', color: 'turquoise' },
  { name: 'white', color: 'white' },
  { name: 'black', color: 'black' },
  { name: 'gray', color: 'gray' },
];

export default function ColorChooser(props) {
  const { setSelectedColors, selectedColors } = props;

  const handleChange = (event) => {
    setSelectedColors(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Colors</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedColors}
          onChange={handleChange}
          input={<OutlinedInput label="Select Colors" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {colors.map((color) => (
            <MenuItem key={color.name} value={color.name} style={{ background: color.color }}>
              <Checkbox
                checked={selectedColors.indexOf(color.name) > -1}
                style={color.name === 'black' ? { color: 'white' } : {}}
              />
              <ListItemText primary={color.name} style={color.name === 'black' ? { color: 'white' } : {}} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

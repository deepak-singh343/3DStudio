import {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThreeDServices } from '../services/threeDServices';
const EnvironmentSelection = () => {
    const defaultEnvironment = Object.keys( ThreeDServices.environments)[0]
    const [environment,setEnvironment] = useState(defaultEnvironment)
    const handleChange = (e)=>{
        setEnvironment(e.target.value)
        ThreeDServices.loadEnvironment(e.target.value)
    }

  return (
    <div className='z-10 absolute top-[20px] right-[20px] w-[40%] md:w-[20%]'>
      <FormControl fullWidth>
        <InputLabel id="environment-label">Environment</InputLabel>
        <Select
          labelId="environment-label"
          id="environment"
          value={environment}
          label="Environment"
          onChange={handleChange}
          defaultValue={environment}
          sx={{color:'blue'}}
        >
            <MenuItem value={'Blouberg Sunrise'}>Blouberg Sunrise</MenuItem>
            <MenuItem value={'Moonless Golf'}>Moonless Golf</MenuItem>
            <MenuItem value={'Pedestrian Overpass'}>Pedestrian Overpass</MenuItem>
            <MenuItem value={'Quarry'}>Quarry</MenuItem>
            <MenuItem value={'Royal Esplanade'}>Royal Esplanade</MenuItem>
            <MenuItem value={'San Giuseppe Bridge'}>San Giuseppe Bridge</MenuItem>
            <MenuItem value={'Venice Sunset'}>Venice Sunset</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default EnvironmentSelection
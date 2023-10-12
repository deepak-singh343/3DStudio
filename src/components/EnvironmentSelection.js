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
    <div className='z-10 absolute top-[20px] right-[20px]'>
      <FormControl variant="filled" sx={{ backgroundColor:'floralwhite' }}>
        <InputLabel id="environment-label" sx={{top:'-8px',left:'-8px',fontSize:'15px',color:'black'}}>Environment</InputLabel>
        <Select
          labelId="environment-label"
          id="environment"
          value={environment}
          label="Environment"
          onChange={handleChange}
          defaultValue={environment}
        >
            {/* <MenuItem value={'Blouberg Sunrise'}>Blouberg Sunrise</MenuItem>
            <MenuItem value={'Moonless Golf'}>Moonless Golf</MenuItem>
            <MenuItem value={'Pedestrian Overpass'}>Pedestrian Overpass</MenuItem>
            <MenuItem value={'Quarry'}>Quarry</MenuItem>
            <MenuItem value={'Royal Esplanade'}>Royal Esplanade</MenuItem>
            <MenuItem value={'San Giuseppe Bridge'}>San Giuseppe Bridge</MenuItem>
            <MenuItem value={'Venice Sunset'}>Venice Sunset</MenuItem> */}
            <MenuItem value={'Texture1'}>Texture 1</MenuItem>
            <MenuItem value={'Texture2'}>Texture 2</MenuItem>
            <MenuItem value={'Texture3'}>Texture 3</MenuItem>
            <MenuItem value={'Texture4'}>Texture 4</MenuItem>
            <MenuItem value={'Texture5'}>Texture 5</MenuItem>
            <MenuItem value={'Texture6'}>Texture 6</MenuItem>
            <MenuItem value={'Texture7'}>Texture 7</MenuItem>
            <MenuItem value={'Texture8'}>Texture 8</MenuItem>
            <MenuItem value={'Texture9'}>Texture 9</MenuItem>
            <MenuItem value={'Texture10'}>Texture 10</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default EnvironmentSelection
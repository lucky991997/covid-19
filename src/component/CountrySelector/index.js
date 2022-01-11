import React from 'react'
import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core'
export default function CountrySelector({value, countries , handleOnChange}) {
  
    return (
        
        <FormControl>
            <InputLabel htmlFor="" shrink>Quốc Gia</InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps = {{
                    name: 'country',
                    id: ' country-selector'
                }}
            >
            {countries.map(country => (
                <option style={{marginLeft: 10}} key={country.ISO2} value={country.ISO2.toLowerCase()} onChange={handleOnChange}>{country.Country}</option>
            ))}
            </NativeSelect>
            <FormHelperText style={{margin: '5px 0'}}> Lựa Chọn Quốc Gia </FormHelperText>
        </FormControl>
    )
}

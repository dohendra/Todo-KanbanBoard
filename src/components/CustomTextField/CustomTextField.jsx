// CustomTextField.jsx
import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomTextField = ({
  name,
  label,
  formik,
  type = 'text',
  showPassword = false,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type={type === 'password' && showPassword ? 'text' : type}
      {...formik.getFieldProps(name)}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      InputProps={{
        ...(type === 'password' && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }),
      }}
    />
  );
};

export default CustomTextField;

import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
  } from "@material-ui/core";
  import { useForm } from "react-hook-form";
  import { useState } from "react";
import { Email, Login } from "@mui/icons-material";
  import * as React from 'react';
  import { Component } from 'react';
  
  interface IFormInput {
    email: string;
    firstName: string;
    password: string;
  }
  
  const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
    },
  }));
  interface detailsInterface{
    email: string;
    password: string;
  }
  function LoginForm() {
    const {
      register,
      handleSubmit,
    } = useForm<IFormInput>();
  
    const { heading, submitButton } = useStyles();
  
    const [json, setJson] = useState<string>();
    const [details, setDetails] = useState<detailsInterface>({email: "", password: ""});
  
    const onSubmit = (data: IFormInput) => {
      setJson(JSON.stringify(data)); 
    };
  function onChange(e: React.ChangeEvent<HTMLInputElement> ){
    setDetails((prevState  )=>{
        return {...prevState, [e.target.name]: e.target.value}
    
    })
  }
    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Sign Up 
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("email")}
            variant="outlined"
            margin="normal"
            label="Email"
            fullWidth
            required
            onChange={onChange}
          />

          <TextField
            {...register("password")}
            variant="outlined"
            margin="normal"
            label="Password"
            type="password"
            fullWidth
            required
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Sign Up
          </Button>
          {json && (
            <>
              <Typography variant="body1">
                Below is the JSON that would normally get passed to the server
                when a form gets submitted
              </Typography>
              <Typography variant="body2">{json}</Typography>
            </>
          )}
        </form>
      </Container>
    );
  }
  
  export default LoginForm;
import { Container, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as React from "react";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

function SignUpForm() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const [json, setJson] = useState<string>();
  const [details, setDetails] = useState<IFormInput>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const onSubmit = (data: IFormInput) => {
    setJson(JSON.stringify(data));
  };
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }
  return (
    <Container maxWidth="xs">
      <Typography
        style={{
          textAlign: "center",
          margin: "1 0 4",
        }}
        variant="h3"
      >
        SignUp
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("firstName")}
          variant="outlined"
          margin="normal"
          label="First Name"
          fullWidth
          required
          onChange={onChange}
        />
        <TextField
          {...register("lastName")}
          variant="outlined"
          margin="normal"
          label="Last Name"
          fullWidth
          required
          onChange={onChange}
        />
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
          {...register("phoneNumber")}
          variant="outlined"
          margin="normal"
          label="Phone"
          fullWidth
          type="tel"
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
          style={{ marginTop: "4px" }}
        >
          Sign Up
        </Button>
        {/* {json && (
          <>
            <Typography variant="body1">
              Below is the JSON that would normally get passed to the server
              when a form gets submitted
            </Typography>
            <Typography variant="body2">{json}</Typography>
          </>
        )} */}
      </form>
    </Container>
  );
}

export default SignUpForm;

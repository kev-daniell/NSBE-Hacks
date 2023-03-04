import { Container, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as React from "react";

interface IFormInput {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const [json, setJson] = useState<string>();
  const [details, setDetails] = useState<IFormInput>({
    email: "",
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
        Login
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
          style={{ marginTop: "4px" }}
        >
          Login
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

export default LoginForm;

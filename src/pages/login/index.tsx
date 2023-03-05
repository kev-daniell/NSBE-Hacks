import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as React from "react";
import useLogin from "@/hooks/useLogin";

interface IFormInput {
  email: string;
  password: string;
}

function LoginForm() {
  const { error, pending, login } = useLogin();

  const [details, setDetails] = useState<IFormInput>({
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(details.email, details.password);
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
      <form onSubmit={onSubmit} noValidate>
        <TextField
          name="email"
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          required
          onChange={onChange}
        />

        <TextField
          name="password"
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          required
          onChange={onChange}
        />
        {!pending && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "4px" }}
          >
            Login
          </Button>
        )}
        {pending && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "4px" }}
            disabled
          >
            <CircularProgress
              size={20}
              sx={{ color: "white", marginRight: 2 }}
            />
            Signup
          </Button>
        )}
      </form>
    </Container>
  );
}

export default LoginForm;

import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import useSignup from "@/hooks/useSignup";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

function SignUpForm() {
  const { error, pending, signup } = useSignup();

  const [details, setDetails] = useState<IFormInput>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    signup(details.email, details.password, details.name);
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
      <form onSubmit={onSubmit} noValidate>
        <TextField
          name="name"
          variant="outlined"
          margin="normal"
          label="Name"
          fullWidth
          required
          onChange={onChange}
        />

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
          name="phoneNumber"
          variant="outlined"
          margin="normal"
          label="Phone"
          fullWidth
          type="tel"
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
            SignUp
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

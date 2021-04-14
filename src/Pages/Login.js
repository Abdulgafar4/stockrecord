import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import logo from "../image/omni.jpg";
import { firestore, firebaseAuth } from "../firebase";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      show_progress: false,
    };

    this.handleChange = this.handleChange.bind();
    this.login = this.login.bind();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // eslint-disable-next-line 

  login = () => {
    let valid_data = true;
  // eslint-disable-next-line 
    this.state.email_error = null;
  // eslint-disable-next-line 
    this.state.password_error = null;

  // eslint-disable-next-line 
    if (this.state.email === "") {
  // eslint-disable-next-line 
      this.state.email_error = "Required";
      valid_data = false;
    }
    // eslint-disable-next-line 
    if (this.state.password === "") {
  // eslint-disable-next-line 
      this.state.password_error = "Required";
      valid_data = false;
    }

    if (valid_data) {
  // eslint-disable-next-line 
      this.state.show_progress = true;
    }

    this.setState({
      update: true,
    });

    if (valid_data) {
      firestore
        .collection("user")
        .where("email", "==", this.state.email)
        .where("IsAdmin", "==", true)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            firebaseAuth
              .signInWithEmailAndPassword(this.state.email, this.state.password)
              .then((res) => {
                this.props.history.replace("/");
              })
              .catch((err) => {
                if (err.code === "auth/wrong-password") {
                 // eslint-disable-next-line 
                  this.state.password_error = "Incorrect Password";
                }
                this.setState({
                  show_progress: false,
                });
              });
          } else {
           // eslint-disable-next-line 
             this.state.email_error = "Incorrect Email";
            this.setState({
              show_progress: false,
            });
          }
        });
    }
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Box
          bgcolor=""
          textAlign="center"
          boxShadow="2"
          borderRadius="12px"
          p="24px"
          mt="50px"
        >
          <img src={logo} height="50px" alt="logo" />
          <Typography variant="h5" color="textSecondary">
            ADMIN
          </Typography>
          <TextField
            label="Email"
            id="outlined-size-small"
            name="email"
            error={this.state.email_error != null}
            helperText={this.state.email_error}
            onChange={this.handleChange}
            placeholder="example@gmail.com"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            label="Password"
            id="outlined-size-small"
            name="password"
            error={this.state.password_error != null}
            helperText={this.state.password_error}
            onChange={this.handleChange}
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
          />
          <br />
          <br />
          <br />
          {this.state.show_progress ? (
            <CircularProgress size={24} thickness={4} color="primary" />
          ) : null}
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            onClick={this.login}
          >
            Login
          </Button>
        </Box>
      </Container>
    );
  }
}

export default Login;

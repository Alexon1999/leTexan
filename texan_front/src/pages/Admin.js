import React, { useEffect, useState } from "react";

// import { auth } from "../../config/firebase";
import useForm from "../hooks/useForm";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AdminPage from "../components/admin";
// import AdminPage from "./AdminPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "3rem auto",
  },
  margin: {
    margin: theme.spacing(4, 1),
  },
}));

const Admin = () => {
  const classes = useStyles();
  const [admin, setAdmin] = useState(true);
  const { state, handleInputChange } = useForm({ email: "", password: "" });

  const { email, password } = state;

  useEffect(() => {
    // const unSubscribe = auth.onAuthStateChanged((authUser) => {
    //   if (authUser) {
    //     setAdmin(authUser);
    //   } else {
    //     setAdmin(null);
    //   }
    // });
    // return () => {
    //   unSubscribe();
    // };
  }, [admin]);

  const seConnecter = (e) => {
    e.preventDefault();

    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .catch((err) => alert(err.message));
  };

  return (
    <>
      {admin ? (
        <AdminPage />
      ) : (
        <div
          style={{
            height: "92vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <form
            noValidate
            autoComplete='off'
            className={classes.root}
            onSubmit={seConnecter}>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel>Adresse Mail</InputLabel>
              <Input
                type='email'
                name='email'
                onChange={handleInputChange}
                value={email}
                required
              />
            </FormControl>

            <FormControl fullWidth className={classes.margin}>
              <TextField
                id='filled-password-input'
                name='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                variant='filled'
                onChange={handleInputChange}
                value={password}
                required
              />
            </FormControl>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{
                display: "flex",
                margin: "10px auto",
                textAlign: "center",
                background: "rgb(77, 76, 76)",
              }}>
              Se connecter
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;

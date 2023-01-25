import React, { useReducer } from "react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import Input from "./UI/Input";
import Button from "./UI/Button";

const GET_USER = gql`
  query CheckUserExists($email: String!, $uname: String!) {
    checkUserExists(email: $email, uname: $uname) {
      id
      createdAt
      updatedAt
      name
      email
      uname
      passwd
    }
  }
`;

const ADD_USER = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $uname: String!
    $passwd: String!
  ) {
    signUp(name: $name, email: $email, uname: $uname, passwd: $passwd) {
      id
      name
      email
      uname
      passwd
    }
  }
`;

const Login = () => {
  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER, {
    fetchPolicy: "network-only",
  });
  const [addUser, { addData, addLoading, addError }] = useMutation(ADD_USER);

  const initialState = {
    name: "",
    email: "",
    uname: "",
    passwd: "",
    rPasswd: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "NAME":
        return { ...state, name: action.value };
      case "EMAIL":
        return { ...state, email: action.value };
      case "UNAME":
        return { ...state, uname: action.value };
      case "PASSWD":
        return { ...state, passwd: action.value };
      case "RPASSWD":
        return { ...state, rPasswd: action.value };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { name, email, uname, passwd, rPasswd } = state;
    if (name.trim().length === 0) return alert("Please enter your Name.");
    else if (email.trim().length === 0)
      return alert("Please enter your E-Mail ID.");
    else if (uname.trim().length === 0)
      return alert("Please enter your Username.");
    else if (passwd.trim().length === 0)
      return alert("Please enter your Password.");
    else if (rPasswd.trim().length === 0)
      return alert("Please enter your Repeat Password.");
    else if (rPasswd.trim() !== passwd.trim())
      return alert(
        "The passwords and the repeat passwords do not match. Kindly check and retry."
      );
    const ans = await getUser({ variables: { email, uname } });
    if (ans.data.checkUserExists.length !== 0)
      return alert("User already exists.");
    const output = await addUser({ variables: { name, email, uname, passwd } });
    return alert(
      `User added successfully with UserID:${output.data.signUp.id}`
    );
  };

  if (loading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Input
          id="name"
          type="text"
          value={state.name}
          onChange={(e) => dispatch({ type: "NAME", value: e.target.value })}
        >
          Name
        </Input>
        <Input
          id="email"
          type="text"
          value={state.email}
          onChange={(e) => dispatch({ type: "EMAIL", value: e.target.value })}
        >
          E-Mail
        </Input>
        <Input
          id="uname"
          type="text"
          value={state.uname}
          onChange={(e) => dispatch({ type: "UNAME", value: e.target.value })}
        >
          Username
        </Input>
        <Input
          id="passwd"
          type="password"
          value={state.passwd}
          onChange={(e) => dispatch({ type: "PASSWD", value: e.target.value })}
        >
          Password
        </Input>
        <Input
          id="rPasswd"
          type="password"
          value={state.rPasswd}
          onChange={(e) => dispatch({ type: "RPASSWD", value: e.target.value })}
        >
          Repeat Password
        </Input>
        <Button type="Submit">Sign-Up</Button>
      </form>
    </>
  );
};

export default Login;

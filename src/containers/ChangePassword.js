import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./ChangePassword.css";

export default function ChangePassword(props) {
  const [fields, handleFieldChange] = useFormFields({
    oldPassword: "",
    password: "",
    confirmPassword: ""
  });
  const [isChanging, setIsChanging] = useState(false);

  function validateForm() {
    return (
      fields.oldPassword.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsChanging(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        fields.oldPassword,
        fields.password
      );

      alert("Your password has been successfully updated!");
      props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      setIsChanging(false);
    }
  }

  return (
    <div className="ChangePassword">
      <form onSubmit={handleSubmit}>
        <FormGroup bsSize="large" controlId="oldPassword">
          <ControlLabel>Old Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.oldPassword}
          />
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="password">
          <ControlLabel>New Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.password}
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="confirmPassword">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          loadingText="Changing…"
          disabled={!validateForm()}
          isLoading={isChanging}
        >
        Change Password
        </LoaderButton>
      </form>
    </div>
  );
}

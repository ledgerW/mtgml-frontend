import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Container, Alert, Button, Form, FormInput, Row, Col } from "shards-react";
import { useFormFields } from "../libs/hooksLib";


export default function ChangePassword(props) {
  const [fields, handleFieldChange] = useFormFields({
    oldPassword: "",
    password: "",
    confirmPassword: ""
  });
  const [isChanging, setIsChanging] = useState(false);
  const [isVisable, setIsVisable] = useState(false);

  function dismiss() {
    setIsVisable(false);
  }

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

      setIsVisable(true);
    } catch (e) {
      alert(e.message);
      setIsChanging(false);
    }
  }

  return (
    <Container fluid className="px-0">
       <Alert theme="success" className="mb-0"
              dismissible={dismiss}
              open={isVisable}>
       Your password has been successfully updated!
       </Alert>

    <Form onSubmit={handleSubmit}>
      <Row form className="mx-4">
        <Col md="4" className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <FormInput
            id="oldPassword"
            type='password'
            placeholder="Old Password"
            onChange={handleFieldChange}
            value={fields.oldPassword}
          />
        </Col>
        <Col md="4" className="form-group">
          <label htmlFor="password">New Password</label>
          <FormInput
            id="password"
            type='password'
            placeholder="New Password"
            onChange={handleFieldChange}
            value={fields.password}
          />
        </Col>
        <Col md="4" className="form-group">
          <label htmlFor="confirmPassword">Repeat Password</label>
          <FormInput
            id="confirmPassword"
            type='password'
            placeholder="Repeat Password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Col>
        <Button
          type="submit"
          size="sm"
          theme="accent"
          className="d-table mx-auto mt-4"
          disabled={!validateForm()}
        >
        Change Password
        </Button>
      </Row>
    </Form>
    </Container>
  );
}

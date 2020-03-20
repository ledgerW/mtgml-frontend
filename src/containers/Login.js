/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button
} from "shards-react";
import { useFormFields } from "../libs/hooksLib";
import { loadUser } from "../libs/sessionLib";
import { Auth, API, Storage } from "aws-amplify";
import { Dispatcher, Constants } from "../flux";


export default function Login(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let profileURL = null;
      await Auth.signIn(fields.email, fields.password);

      const data = await loadUser(fields.email);

      if (data.profilePic) {
        profileURL = await Storage.vault.get(data.profilePic);
        profileURL = await fetch(profileURL)
          .then(resp => resp.blob())
          .then(blob => {
            return URL.createObjectURL(blob);
          });
      }

      props.userHasAuthenticated({
        'auth':true,
        'data':data,
        'profileURL':profileURL});


    } catch (e) {
      if (e.name === 'UserNotConfirmedException') {
        await Auth.resendSignUp(fields.email);

        alert("Please confirm your email. Resending confirmation to " + fields.email);

        Dispatcher.dispatch({
          actionType: Constants.NEW_USER,
          payload: {
            user: fields.email,
            userConfirmed: false
          }
        });

        props.history.push("/signup");
      } else {
        alert(e.message);
      }
    }

    props.history.push("/");
  }

  return (
    <Container fluid className="main-content-container h-100 px-4">
      <Row noGutters className="h-100">
        <Col lg="3" md="5" className="auth-form mx-auto my-auto">
          <Card>
            <CardBody>
              {/* Logo */}
              <img
                className="auth-form__logo d-table mx-auto mb-3"
                src={require("../images/favicon.ico")}
                alt="Shards Dashboards - Login Template"
              />

              {/* Title */}
              <h5 className="auth-form__title text-center mb-4">
                Login
              </h5>

              {/* Form Fields */}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <FormInput
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={fields.email}
                    onChange={handleFieldChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <FormInput
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={fields.password}
                    onChange={handleFieldChange}
                  />
                </FormGroup>
                <Button
                  pill
                  theme="accent"
                  className="d-table mx-auto"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>


          {/* Meta Details */}
          <div className="auth-form__meta d-flex mt-4">
            <Link to="/login/reset">Forgot your password?</Link>
            <Link to="/signup" className="ml-auto">
              Create a new account?
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

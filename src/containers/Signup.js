import React, { useState } from "react";
import { Auth } from "aws-amplify";
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
import { Link } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";
import { Store, Dispatcher, Constants } from "../flux";


export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [isFillingForm, setIsFillingForm] = useState(true);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      Dispatcher.dispatch({
        actionType: Constants.NEW_USER,
        payload: newUser
      });
      setIsFillingForm(false);
    } catch (e) {
      if (e.name === 'UsernameExistsException') {
        try {
          await Auth.resendSignUp(fields.email);
          alert("You have already registered. Resending confirmation to " + fields.email);
          Dispatcher.dispatch({
            actionType: Constants.NEW_USER,
            payload: {
              user: fields.email,
              userConfirmed: false
            }
          });
          setIsFillingForm(false);
        } catch (e) {
          alert("There is already an account registered with " + fields.email);
        }
      }
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    try {
      var user_email = fields.email ? fields.email : Store.newUser.user;
      await Auth.confirmSignUp(user_email, fields.confirmationCode);
      Dispatcher.dispatch({
        actionType: Constants.NEW_USER,
        payload: null
      });

      // Create new user in Dynamo


      props.history.push("/login");
    } catch (e) {
      alert(e.message);
    }
  }


  function renderConfirmationForm() {
    return (
      <Container fluid className="main-content-container h-100 px-4">
        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Card>
              <CardBody>
                {/* Logo */}
                <img
                  className="auth-form__logo d-table mx-auto mb-3"
                  src={require("../images/shards-dashboards-logo.svg")}
                  alt="Shards Dashboards - Register Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Confirm Your Email Address
                </h5>
                <h6>A confirmation code has been sent to your email</h6>

                {/* Form Fields */}
                <Form onSubmit={handleConfirmationSubmit}>
                  <FormGroup>
                    <label htmlFor="confirmationCode">Confirmation Code</label>
                    <FormInput
                      type="tel"
                      id="confirmationCode"
                      placeholder="Confirmation Code"
                      onChange={handleFieldChange}
                      value={fields.confirmationCode}
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                    disabled={!validateConfirmationForm()}
                  >
                    Confirm
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  function renderForm() {
    return (
      <Container fluid className="main-content-container h-100 px-4">
        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Card>
              <CardBody>
                {/* Logo */}
                <img
                  className="auth-form__logo d-table mx-auto mb-3"
                  src={require("../images/shards-dashboards-logo.svg")}
                  alt="Shards Dashboards - Register Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Create New Account
                </h5>

                {/* Form Fields */}
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <label htmlFor="email">Email address</label>
                    <FormInput
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={fields.email}
                      onChange={handleFieldChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password">Password</label>
                    <FormInput
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={fields.password}
                      onChange={handleFieldChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <FormInput
                      type="password"
                      id="confirmPassword"
                      placeholder="Repeat Password"
                      value={fields.confirmPassword}
                      onChange={handleFieldChange}
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                    disabled={!validateForm()}
                  >
                    Signup
                  </Button>
                </Form>
              </CardBody>
            </Card>

            {/* Meta Details */}
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/login/reset">Forgot your password?</Link>
              <Link to="/login" className="ml-auto">Sign In?</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    Store.newUser() === null ? renderForm() : renderConfirmationForm()
  );
}

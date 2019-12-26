import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";


export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      password: "",
      codeSent: false,
      confirmed: false,
      confirmPassword: "",
      isConfirming: false,
      isSendingCode: false
    };
  }

  validateCodeForm() {
    return this.state.email.length > 0;
  }

  validateResetForm() {
    return (
      this.state.code.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSendCodeClick = async event => {
    event.preventDefault();

    this.setState({ isSendingCode: true });

    try {
      await Auth.forgotPassword(this.state.email);
      this.setState({ codeSent: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isSendingCode: false });
    }
  };

  handleConfirmClick = async event => {
    event.preventDefault();

    this.setState({ isConfirming: true });

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      );
      this.setState({ confirmed: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isConfirming: false });
    }
  };


  renderRequestCodeForm() {
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
                  Reset Password
                </h5>

                {/* Form Fields */}
                <Form onSubmit={this.handleSendCodeClick}>
                  <FormGroup>
                    <label htmlFor="email">Email address</label>
                    <FormInput
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <small className="form-text text-muted text-center">
                      You will receive an email with a verification code.
                    </small>
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                    disabled={!this.validateCodeForm()}
                  >
                    Send Verification Code
                  </Button>
                </Form>
              </CardBody>
            </Card>

            {/* Meta Details */}
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/login" className="mx-auto">
                Take me back to login.
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }


  renderConfirmationForm() {
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
                  Reset Password (Confirmation Code)
                </h5>

                {/* Form Fields */}
                <Form onSubmit={this.handleConfirmClick}>
                  <FormGroup>
                    <label htmlFor="email">Confirmation Code</label>
                    <FormInput
                      type="tel"
                      id="code"
                      placeholder="Confirmation Code"
                      value={this.state.code}
                      onChange={this.handleChange}
                    />
                    <small className="form-text text-muted text-center">
                    Please check your email ({this.state.email}) for the confirmation
                    code.
                    </small>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="email">New Password</label>
                    <FormInput
                      type="password"
                      id="password"
                      placeholder="New Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="email">Confirm Password</label>
                    <FormInput
                      type="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                    disabled={!this.validateResetForm()}
                  >
                    Reset Password
                  </Button>
                </Form>
              </CardBody>
            </Card>

            {/* Meta Details */}
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/login" className="mx-auto">
                Take me back to login.
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  renderSuccessMessage() {
    return (
      <Container fluid className="main-content-container h-100 px-4">
        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Card>
              <CardBody>
                <div className="success">
                  <p>Your password has been reset.</p>
                  <p>
                    <Link to="/login">
                      Click here to login with your new credentials.
                    </Link>
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      !this.state.codeSent
        ? this.renderRequestCodeForm()
        : !this.state.confirmed
          ? this.renderConfirmationForm()
          : this.renderSuccessMessage()
    );
  }
}

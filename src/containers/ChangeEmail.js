import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import { Container, Button, Form, FormInput, Row, Col, Alert } from "shards-react";
import { useFormFields } from "../libs/hooksLib";


export default function ChangeEmail(props) {
  const [fields, handleFieldChange] = useFormFields({
    code: "",
    email: ""
  });
  const [codeSent, setCodeSent] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isVisable, setIsVisable] = useState(false);
  localStorage.setItem('editEmailVis', 'false');

  useEffect(() => {
    async function onLoad() {
      setIsVisable((localStorage.getItem('editEmailVis') == 'true'));

      try {
        const user = await Auth.currentUserInfo();
        setEmailVerified(user.attributes.email_verified);
        setUserEmail(user.attributes.email);

        if (!user.attributes.email_verified) {
          alert(`Please confirm your recent email change for ${user.attributes.email}, or enter a new email below.`);
        }
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.authenticated]);

  function updateUser(updates) {
    return API.put("mtgml", "/users", {
      body: updates
    });
  }

  function dismiss() {
    localStorage.setItem('editEmailVis', 'false');
    setIsVisable(false);
  }

  function validatEmailForm() {
    return fields.email.length > 0;
  }

  function validateConfirmForm() {
    return fields.code.length > 0;
  }

  async function handleResendValidation(event) {
    event.preventDefault();

    setIsSendingCode(true);
    try {
      await Auth.verifyCurrentUserAttribute("email");

      setCodeSent(true);
    } catch (e) {
      alert(e.message);
      setIsSendingCode(false);
    }
  }

  async function handleUpdateClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: fields.email });

      setUserEmail(fields.email);
      setCodeSent(true);
    } catch (e) {
      alert(e.message);
      setIsSendingCode(false);
    }
  };

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);
    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", fields.code);

      const _ = await updateUser({
        'email': userEmail
      });

      var newUserData = props.authenticated.data;
      newUserData.email = userEmail;

      props.userHasAuthenticated({
        'auth':props.authenticated.auth,
        'data':newUserData,
        'profileURL':props.authenticated.profileURL});

      localStorage.setItem('editEmailVis', 'true');
    } catch (e) {
      alert(e.message);
      setIsConfirming(false);
    }
  };


  function renderUpdateForm() {
    return (
      <Form className="py-4" onSubmit={handleUpdateClick}>
        <Row form className="mx-4">
          <Col md="4" className="form-group">
          {!emailVerified && (
            <Row form>
              <Col md="6" className="form-group">
                <Button
                  size="sm"
                  theme="accent"
                  className="d-table mx-auto mt-4"
                  onClick={handleResendValidation}
                >
                Resend Verification
                </Button>
                <p className="form-text text-muted m-0">
                  Confirmation code will be sent to ({userEmail}).
                </p>
                <p className="form-text text-muted m-0">
                  <b>OR</b>
                </p>
                <p className="form-text text-muted m-0">
                  Enter a new email below.
                </p>
              </Col>
            </Row>
          )}
          {!emailVerified && (
            <hr />
          )}
            <Row form>
              <label htmlFor="email">Email</label>
              <FormInput
                id="email"
                type="email"
                placeholder={userEmail}
                value={fields.email}
                onChange={handleFieldChange}
              />
            </Row>
            <Button
              size="sm"
              theme="accent"
              className="d-table mx-auto mt-4"
              type="submit"
              disabled={!validatEmailForm()}
            >
            Update Email
            </Button>
         </Col>
      </Row>
    </Form>
    );
  }

  function renderConfirmationForm() {
    return (
      <Form className="py-4" onSubmit={handleConfirmClick}>
        <Row form className="mx-4">
          <Col md="4" className="form-group">
            <Row form>
                <label htmlFor="code">Confirmation Code</label>
                <FormInput
                  id="code"
                  type="tel"
                  placeholder="Confirmation Code"
                  value={fields.code}
                  onChange={handleFieldChange}
                />
                <p className="form-text text-muted m-0">
                  Please check your email ({userEmail}) for the confirmation
                  code.
                </p>
            </Row>
            <Button
              size="sm"
              theme="accent"
              className="d-table mx-auto mt-4"
              type="submit"
              disabled={!validateConfirmForm()}
            >
            Confirm
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  return (
    <Container fluid className="px-0">
       <Alert theme="success" className="mb-0"
              dismissible={dismiss}
              open={isVisable}>
       Your email has been successfully updated!
       </Alert>
    {!codeSent ? renderUpdateForm() : renderConfirmationForm()}
    </Container>
  );
}

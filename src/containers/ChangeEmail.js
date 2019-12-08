import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import {HelpBlock, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./ChangeEmail.css";

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

  useEffect(() => {
    async function onLoad() {
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
  }, []);

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

      alert("Email successfully verified :)");

      props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      setIsConfirming(false);
    }
  };


  function renderUpdateForm() {
    return (
      <form onSubmit={handleUpdateClick}>
        {!emailVerified && (
          <FormGroup>
            <LoaderButton
              block
              onClick={handleResendValidation}
              bsSize="large"
              loadingText="Sending…"
            >
            Resend Verification
            </LoaderButton>
            <HelpBlock>
              Confirmation code will be sent to ({userEmail}).
            </HelpBlock>
            <HelpBlock>
              <b>OR</b>
            </HelpBlock>
            <HelpBlock>
              Enter a new email below.
            </HelpBlock>
          </FormGroup>
        )}
        {!emailVerified && (
          <hr />
        )}
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          loadingText="Updating…"
          disabled={!validatEmailForm()}
          isLoading={isSendingCode}
        >
        Update Email
        </LoaderButton>
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmClick}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={fields.code}
            onChange={handleFieldChange}
          />
          <HelpBlock>
            Please check your email ({userEmail}) for the confirmation
            code.
          </HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          loadingText="Confirm…"
          isLoading={isConfirming}
          disabled={!validateConfirmForm()}
        >
        Confirm
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="ChangeEmail">
      {!codeSent ? renderUpdateForm() : renderConfirmationForm()}
    </div>
  );
}

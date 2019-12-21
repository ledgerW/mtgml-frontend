import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";

export default function Settings(props) {
  return (
    <div className="Settings">
      <LinkContainer to="/settings/email">
        <LoaderButton
          block
          bsSize="large"
        >
          Change Email
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/password">
        <LoaderButton
          block
          bsSize="large"
        >
          Change Password
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/update_payment">
        <LoaderButton
          block
          bsSize="large"
        >
          Update Payment Information
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/subscribe">
        <LoaderButton
          block
          bsSize="large"
        >
          Your Subscription
        </LoaderButton>
      </LinkContainer>
    </div>
  );
}

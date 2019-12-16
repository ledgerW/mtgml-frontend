import React, { useState } from "react";
import { API } from "aws-amplify";
import config from "../config";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./SubscribeForm.css";

function SubscribeForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    plan: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      fields.plan !== ""
    );
  }

  function getCheckoutSession(details) {
    return API.post("decks", "/subscribe", {
      body: details
    });
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    const checkoutSession = await getCheckoutSession({ plan: "plan_GKFxKvCTS7Pggi", domain: config.DOMAIN });

    setIsProcessing(false);

    onSubmit(fields.plan, checkoutSession);
  }

  return (
    <form className="SubscribeForm" onSubmit={handleSubmitClick}>
      <FormGroup bsSize="large" controlId="plan">
        <ControlLabel>Put Subscription Plans Here</ControlLabel>
        <FormControl
          type="text"
          value={fields.plan}
          onChange={handleFieldChange}
          placeholder="This will be a plan input form..."
        />
      </FormGroup>
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Subscribe
      </LoaderButton>
    </form>
  );
}

export default SubscribeForm;

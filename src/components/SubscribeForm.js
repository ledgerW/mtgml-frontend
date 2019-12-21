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
        <div class="sr-main" style={{display: "flex"}}>
        <header class="sr-header">
          <div class="sr-header__logo"></div>
        </header>
        <div class="sr-container">
          <section class="container basic-photo">
            <div>
              <h1>Basic subscription</h1>
              <h4>1 photo per month</h4>
              <div class="pasha-image">
                <img
                  src="https://picsum.photos/280/320?random=4"
                  width="140"
                  height="160"
                />
              </div>
            </div>
            <button id="basic-plan-btn">$5.00 per month</button>
          </section>
          <section class="container pro-photo">
            <div>
              <h1>Pro subscription</h1>
              <h4>3 photos per month</h4>
              <div class="pasha-image-stack">
                <img
                  src="https://picsum.photos/280/320?random=1"
                  width="105"
                  height="120"
                  alt="Sample Pasha image 1"
                />
                <img
                  src="https://picsum.photos/280/320?random=2"
                  width="105"
                  height="120"
                  alt="Sample Pasha image 2"
                />
                <img
                  src="https://picsum.photos/280/320?random=3"
                  width="105"
                  height="120"
                  alt="Sample Pasha image 3"
                />
              </div>
            </div>
            <button id="pro-plan-btn">$14.00 per month</button>
          </section>
        </div>
        <div id="error-message"></div>
      </div>
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

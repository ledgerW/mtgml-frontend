import React, { useState } from "react";
import { API } from "aws-amplify";
import config from "../config";
import { Elements, StripeProvider } from "react-stripe-elements";
import PaymentForm from "../components/PaymentForm";
//import "./Payment.css";

export default function Payment(props) {
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return API.post("decks", "/payment", {
      body: details
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
  if (error) {
    alert(error);
    return;
  }

  setIsLoading(true);

  try {
    await billUser({
      storage,
      source: token.id
    });

    alert("Your card has been charged successfully!");
    props.history.push("/");
  } catch (e) {
    alert(e);
    setIsLoading(false);
  }
}

return (
  <div className="Payment">
    <StripeProvider apiKey={config.STRIPE_KEY}>
      <Elements>
        <PaymentForm
          isLoading={isLoading}
          onSubmit={handleFormSubmit}
        />
      </Elements>
    </StripeProvider>
  </div>
);
}

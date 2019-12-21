import React, { useState } from "react";
import config from "../config";
import SubscribeForm from "../components/SubscribeForm";
import "./Subscribe.css";

export default function Subscribe(props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(plan, checkoutSession) {
    setIsLoading(true);

    var stripe = window.Stripe(config.STRIPE_KEY);
    stripe.redirectToCheckout({
      sessionId: checkoutSession.session.id
    }).then(function (result) {
      alert(result.error.message);
    });

    setIsLoading(false);
  }

  return (
    <div className="Subscribe">
      <SubscribeForm
        isLoading={isLoading}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

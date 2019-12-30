const dev = {
  STRIPE_KEY: "pk_test_Y0iTsszHSlEHYP6gGfxsRUwX00S1UEqgpK",
  DOMAIN: "https://mtgml.netlify.com/",
  s3: {
    REGION: "us-east-1",
    BUCKET: "mtgml-storage-dev-s3bucket-18hp0a14w8tkb"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6k06l9f2gf.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_UKSRp4cqj",
    APP_CLIENT_ID: "67cuic0uehnjigufi1s7qeq2a9",
    IDENTITY_POOL_ID: "us-east-1:f8421eeb-b4aa-4bde-afa4-83330991420b"
  },
};

const prod = {
  STRIPE_KEY: "pk_test_Y0iTsszHSlEHYP6gGfxsRUwX00S1UEqgpK",
  DOMAIN: "https://mtgml.netlify.com/",
  s3: {
    REGION: "us-east-1",
    BUCKET: "mtgml-prod-attachmentsbucket-pdcw0jea0tga"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://4o28vvlwg9.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Ka9TkZJ1O",
    APP_CLIENT_ID: "29erkh67kqeb2nvmvvj6c1v2rn",
    IDENTITY_POOL_ID: "us-east-1:fc5f117b-b733-472f-b9ff-4e35686ec3bd"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod"
  ? prod
  : dev;

config.DOMAIN = process.env.REACT_APP_USERNAME === "lwest"
  ? "http://localhost:3000/"
  : config.DOMAIN;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};

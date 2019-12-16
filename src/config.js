const dev = {
  STRIPE_KEY: "pk_test_Y0iTsszHSlEHYP6gGfxsRUwX00S1UEqgpK",
  DOMAIN: "https://mtgml.netlify.com/",
  s3: {
    REGION: "us-east-1",
    BUCKET: "mtgml-dev-attachmentsbucket-1x9s74kqwhnlh"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://otspimlra4.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_fdBuXli5D",
    APP_CLIENT_ID: "4b6fbfmc13937cp8vh8blus5uc",
    IDENTITY_POOL_ID: "us-east-1:c2d4e3f8-fb29-4a13-9e8b-a88c7f1f2d04"
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

const dev = {
  STRIPE_KEY: "pk_test_Y0iTsszHSlEHYP6gGfxsRUwX00S1UEqgpK",
  DOMAIN: "https://mtgml.netlify.com/",
  s3: {
    REGION: "us-east-1",
    BUCKET: "mtgml-storage-dev-s3bucket-1itpt0az270lk"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ybq8f1d657.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_RmjPM2rab",
    APP_CLIENT_ID: "1ojsrmod4a69glfoe9vilflrjm",
    IDENTITY_POOL_ID: "us-east-1:33ff9b7c-9077-414a-a802-06482b17c8d1"
  },
};

const prod = {
  STRIPE_KEY: "pk_test_Y0iTsszHSlEHYP6gGfxsRUwX00S1UEqgpK",
  DOMAIN: "https://mtgml.netlify.com/",
  s3: {
    REGION: "us-east-1",
    BUCKET: "mtgml-storage-prod-s3bucket-1uxz81xl69zc0"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://0d3wryadc6.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_HD0acUmPa",
    APP_CLIENT_ID: "4eps1erkl1604jf5slhi9mp9bh",
    IDENTITY_POOL_ID: "us-east-1:9b695c79-187a-45c1-925b-59593ac69caf"
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

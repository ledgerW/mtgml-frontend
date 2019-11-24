export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_Y0iTsszHSlEHYP6gGfxsRUwX00S1UEqgpK",
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

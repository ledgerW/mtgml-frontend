import React, { useState, useRef, useEffect } from "react";
import TagsInput from "react-tagsinput";
import { API, Storage } from "aws-amplify";
import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormInput,
  FormSelect,
  FormCheckbox,
  FormTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";
import { useFormFields } from "../libs/hooksLib";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import FormSectionTitle from "../components/edit-user-profile/FormSectionTitle";
import ProfileBackgroundPhoto from "../components/edit-user-profile/ProfileBackgroundPhoto";
import ChangeEmail from "../containers/ChangeEmail";
import ChangePassword from "../containers/ChangePassword";

export default function EditUserProfile(props) {
  const file = useRef(null);
  const [fields, handleFieldChange] = useFormFields({
    userName: props.authenticated.data.userName,
    arenaName: props.authenticated.data.arenaName
  });
  const [profilePic, setProfilePic] = useState(props.authenticated.profileURL);
  const [generalVis, setGeneralVis] = useState(false);


  function dismiss() {
    setGeneralVis(false);
  }

  function updateUser(updates) {
    return API.put("mtgml", "/users", {
      body: updates
    });
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  }


  async function handleGeneralSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    try {
      const profilePicKey = file.current
        ? await s3Upload(file.current)
        : null;

      console.log('profilePicKey from S3: ' + profilePicKey);

      const _ = await updateUser({
        'userName': fields.userName,
        'arenaName': fields.arenaName,
        'profilePic': profilePicKey
      });

      setGeneralVis(true);

      // UPDATE THIS 
      //props.userHasAuthenticated({
      //  'auth':props.authenticated.auth,
      //  'data':props.authenticated.data,
      //  'profileURL':profilePic});
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <Row>
          <Col lg="8" className="mx-auto mt-4">
            <Card small className="edit-user-details mb-4">
              <ProfileBackgroundPhoto />

              <CardBody className="p-0">

                {/* Form Section Title :: General */}

                <Container fluid className="px-0">
                  <Alert theme="success" className="mb-0"
                         dismissible={dismiss}
                         open={generalVis}>
                    Your profile has been successfully updated!
                  </Alert>
                </Container>

                <Form className="py-4" onSubmit={handleGeneralSubmit}>
                  <FormSectionTitle
                    title="Change Profile"
                    description="Change your general profile details."
                  />

                  <Row form className="mx-4">
                    <Col lg="8">
                      <Row form>
                        {/* Username */}
                        <Col md="6" className="form-group">
                          <label htmlFor="userName">Username</label>
                          <FormInput
                            type='text'
                            id="userName"
                            placeholder={fields.userName}
                            value={fields.userName}
                            onChange={handleFieldChange}
                          />
                        </Col>

                        {/* MTG Arena Username */}
                        <Col md="6" className="form-group">
                          <label htmlFor="mtgArenaName">MTG Arena Username</label>
                          <FormInput
                            type="text"
                            id="arenaName"
                            placeholder={fields.arenaName !== null ? fields.arenaName : 'ArenaName#123456' }
                            value={fields.arenaName}
                            onChange={handleFieldChange}
                          />
                        </Col>

                      </Row>
                      <Button
                        type='submit'
                        size="sm"
                        theme="accent"
                        className="d-table mx-auto mt-4"
                      >
                        Save Changes
                      </Button>
                    </Col>


                    {/* User Profile Picture */}
                    <Col lg="4">
                      <label
                        htmlFor="userProfilePicture"
                        className="text-center w-100 mb-4"
                      >
                        Profile Picture
                      </label>
                      <div className="edit-user-details__avatar m-auto">
                      <img
                        src={profilePic || require("../images/avatars/lw2134.jpg")}
                        alt="User Avatar"
                      />
                        <label className="edit-user-details__avatar__change">
                          <i className="material-icons mr-1">&#xE439;</i>
                          <FormInput
                            id="userProfilePicture"
                            className="d-none"
                            type="file"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {/*
                      <Button
                        size="sm"
                        theme="white"
                        className="d-table mx-auto mt-4"
                      >
                        <i className="material-icons">&#xE2C3;</i> Upload
                        Image
                      </Button>
                    */}

                    </Col>
                  </Row>
                </Form>

                <hr />

                {/* Change Email */}
                <Row form className="mx-4">
                  <Col className="mb-3">
                    <h6 className="form-text m-0">Change Email</h6>
                    <p className="form-text text-muted m-0">
                      Change your current email. A confirmation code will be sent to your new email address.
                    </p>
                  </Col>
                </Row>

                <ChangeEmail></ChangeEmail>

                <hr />


                {/* Change Password */}
                <Row form className="mx-4">
                  <Col className="mb-3">
                    <h6 className="form-text m-0">Change Password</h6>
                    <p className="form-text text-muted m-0">
                      Change your current password.
                    </p>
                  </Col>
                </Row>

                <ChangePassword></ChangePassword>

              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

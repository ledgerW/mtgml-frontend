import React from "react";
import TagsInput from "react-tagsinput";
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

import FormSectionTitle from "../components/edit-user-profile/FormSectionTitle";
import ProfileBackgroundPhoto from "../components/edit-user-profile/ProfileBackgroundPhoto";
import ChangeEmail from "../containers/ChangeEmail";

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleGeneralSubmit = this.handleGeneralSubmit.bind(this);
  }

  handleGeneralSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Container fluid className="px-0">
          <Alert theme="success" className="mb-0">
            Ole! Your profile has been successfully updated!
          </Alert>
        </Container>
        <Container fluid className="main-content-container px-4">
          <Row>
            <Col lg="8" className="mx-auto mt-4">
              <Card small className="edit-user-details mb-4">
                <ProfileBackgroundPhoto />

                <CardBody className="p-0">

                  {/* Form Section Title :: General */}
                  <Form className="py-4" onSubmit={this.handleGeneralSubmit}>
                    <FormSectionTitle
                      title="General"
                      description="Setup your general profile details."
                    />

                    <Row form className="mx-4">
                      <Col lg="8">
                        <Row form>
                          {/* First Name */}
                          <Col md="6" className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <FormInput
                              id="firstName"
                              value="Ledger"
                              onChange={() => {}}
                            />
                          </Col>

                          {/* Last Name */}
                          <Col md="6" className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <FormInput
                              type="text"
                              id="lastName"
                              value="West"
                              onChange={() => {}}
                            />
                          </Col>

                          {/* MTG Arena Username */}
                          <Col md="6" className="form-group">
                            <label htmlFor="mtgArenaName">MTG Arena Username</label>
                            <FormInput
                              type="text"
                              id="mtgArenaName"
                              value="lw2134"
                              onChange={() => {}}
                            />
                          </Col>

                          {/* Email Address */}
                          <Col md="6" className="form-group">
                            <label htmlFor="email">Email</label>
                            <InputGroup seamless>
                              <InputGroupAddon type="prepend">
                                <InputGroupText>
                                  <i className="material-icons">&#xE0BE;</i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <FormInput
                                id="email"
                                value="ledger.west@gmail.com"
                                onChange={() => {}}
                              />
                            </InputGroup>
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
                            src={require("../images/avatars/0.jpg")}
                            alt="User Avatar"
                          />
                          <label className="edit-user-details__avatar__change">
                            <i className="material-icons mr-1">&#xE439;</i>
                            <FormInput
                              id="userProfilePicture"
                              className="d-none"
                            />
                          </label>
                        </div>
                        <Button
                          size="sm"
                          theme="white"
                          className="d-table mx-auto mt-4"
                        >
                          <i className="material-icons">&#xE2C3;</i> Upload
                          Image
                        </Button>

                      </Col>
                    </Row>
                  </Form>

                  <hr />

                  {/* TEST Change Email */}
                  <Row form className="mx-4">
                    <Col className="mb-3">
                      <h6 className="form-text m-0">Change Email</h6>
                      <p className="form-text text-muted m-0">
                        Change your current email.
                      </p>
                    </Col>
                  </Row>

                  <Row form className="mx-4">
                    {/* Change Email :: New Email */}
                    <Col md="4" className="form-group">
                      <ChangeEmail></ChangeEmail>
                    </Col>
                  </Row>

                  <hr />

                    {/* Change Email */}
                    <Row form className="mx-4">
                      <Col className="mb-3">
                        <h6 className="form-text m-0">Change Email</h6>
                        <p className="form-text text-muted m-0">
                          Change your current email.
                        </p>
                      </Col>
                    </Row>

                    <Row form className="mx-4">
                      {/* Change Email :: New Email */}
                      <Col md="4" className="form-group">
                        <label htmlFor="newEmail">New Email</label>
                        <FormInput
                          id="newEmail"
                          placeholder="New Email"
                          onChange={() => {}}
                        />
                      </Col>
                    </Row>

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

                    <Row form className="mx-4">
                      {/* Change Password :: Old Password */}
                      <Col md="4" className="form-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <FormInput
                          id="oldPassword"
                          placeholder="Old Password"
                          onChange={() => {}}
                        />
                      </Col>

                      {/* Change Password :: New Password */}
                      <Col md="4" className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <FormInput
                          id="newPassword"
                          placeholder="New Password"
                          onChange={() => {}}
                        />
                      </Col>

                      {/* Change Password :: Repeat New Password */}
                      <Col md="4" className="form-group">
                        <label htmlFor="repeatNewPassword">
                          Repeat New Password
                        </label>
                        <FormInput
                          id="repeatNewPassword"
                          placeholder="Old Password"
                          onChange={() => {}}
                        />
                      </Col>
                    </Row>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EditUserProfile;

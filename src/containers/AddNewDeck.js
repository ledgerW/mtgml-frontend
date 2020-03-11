import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import { useFormFields } from "../libs/hooksLib";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormInput,
  FormTextarea,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
//import SidebarActions from "../components/add-new-post/SidebarActions";
//import SidebarCategories from "../components/add-new-post/SidebarCategories";


export default function AddNewDeck(props) {
  const file = useRef(null);
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    content: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("Choose file...");

  function validateForm() {
    return fields.content.length > 0 && fields.name.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
    setFileName(event.target.files[0].name);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;

      const content = fields.content;
      const name = fields.name;

      await createDeck({ name, content, attachment });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createDeck(deck) {
    return API.post("mtgml", "/decks", {
      body: deck
    });
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Add New Deck" subtitle="Decks" className="text-sm-left" />
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Editor */}
          <Col lg="8" md="12">
            <Card small className="mb-3">
              <CardBody>
                <FormInput
                  id='name'
                  size="lg"
                  className="mb-3"
                  placeholder="Your Deck Title"
                  value={fields.name}
                  onChange={handleFieldChange}
                />
                <FormTextarea
                  id="content"
                  className="add-new-post__editor mb-1"
                  placeholder="Paste a valid deck list here (e.g. by exporting deck from MTG Arena)"
                  value={fields.content}
                  onChange={handleFieldChange}
                />
              </CardBody>
            </Card>
          </Col>

          {/* Sidebar Widgets */}
          <Col lg="4" md="12">
            <Card small>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Upload Deck List</h6>
              </CardHeader>

              <CardBody>
                <div className="custom-file mb-3">
                  <input
                    id="deckFile"
                    type="file"
                    className="custom-file-input"
                    id="customFile2"
                    onChange={handleFileChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile2">
                    {fileName}
                  </label>
                </div>
              </CardBody>
            </Card>
            <Container className="page-header py-4">
              <Button
                block
                type="submit"
                size="lg"
                theme="primary"
                isLoading={isLoading}
                disabled={!validateForm()}
              >
                Create
              </Button>
            </Container>
            {/*
            <SidebarActions />
            <SidebarCategories />
            */}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

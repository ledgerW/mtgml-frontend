import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
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

export default function Decks(props) {
  const file = useRef(null);
  const [deck, setDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fileName, setFileName] = useState("Choose file...");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    function loadDeck(analyze=false) {
      let httpInit = {
        queryStringParameters: {
            analyze: analyze
        }
      };

      return API.get("mtgml", `/decks/${props.match.params.id}`, httpInit);
    }

    async function onLoad() {
      try {
        const deck = await loadDeck();
        const { name, content, attachment } = deck;

        if (attachment) {
          deck.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setName(name);
        setDeck(deck);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

function validateForm() {
  return content.length > 0 && name.length > 0;
}

function formatFilename(str) {
  return str.replace(/^\w+-/, "");
}

function handleFileChange(event) {
  file.current = event.target.files[0];
  setFileName(event.target.files[0].name);
}

function saveDeck(deck) {
  return API.put("mtgml", `/decks/${props.match.params.id}`, {
    body: deck
  });
}

async function handleSubmit(event) {
  let attachment;

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
    if (file.current) {
      attachment = await s3Upload(file.current);
    }

    await saveDeck({
      name,
      content,
      attachment: attachment || deck.attachment
    });
    props.history.push(`/decks/${deck.deckId}`);
  } catch (e) {
    alert(e);
    setIsLoading(false);
  }
}

function deleteDeck() {
  return API.del("mtgml", `/decks/${props.match.params.id}`);
}

async function handleDelete(event) {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmed) {
    return;
  }

  setIsDeleting(true);

  try {
    await deleteDeck();
    props.history.push('/');
  } catch (e) {
    alert(e);
    setIsDeleting(false);
  }
}

return (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Update Deck" subtitle="Decks" className="text-sm-left" />
    </Row>

    {deck && (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg="8" md="12">
          <Card small className="mb-3">
            <CardBody>
              <FormInput
                id='name'
                size="lg"
                className="mb-3"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <FormTextarea
                id="content"
                className="add-new-post__editor mb-1"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </CardBody>
          </Card>
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="4" md="12">
          <Card small>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Upload New Deck List</h6>
            </CardHeader>

            <CardBody>
              <div className="custom-file mb-3">
                <input
                  id="deckFile"
                  type="file"
                  className="custom-file-input"
                  onChange={handleFileChange}
                />
                <label className="custom-file-label" htmlFor="deckFile">
                  {fileName}
                </label>
              </div>
            </CardBody>
          </Card>
          {deck.attachment && (
          <Container className="page-header py-4">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl.Static>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={deck.attachmentURL}
              >
                {formatFilename(deck.attachment)}
              </a>
            </FormControl.Static>
          </Container>
          )}
          <Container className="page-header py-4">
            <Button
              block
              type="submit"
              size="lg"
              theme="primary"
              isLoading={isLoading}
              disabled={!validateForm() || isLoading}
            >
              Save
            </Button>
          </Container>
          <Container className="page-header py-4">
            <Button
              block
              size="lg"
              theme="danger"
              onClick={handleDelete}
              isLoading={isDeleting}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </Container>
          {/*
          <SidebarActions />
          <SidebarCategories />
          */}
        </Col>
      </Row>
    </Form>
    )}
  </Container>
);



{/*
return (
    <div className="Decks">
      {deck && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          {deck.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={deck.attachmentURL}
                >
                  {formatFilename(deck.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!deck.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );*/}
}

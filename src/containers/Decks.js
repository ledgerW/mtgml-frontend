import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";

export default function Decks(props) {
  const file = useRef(null);
  const [deck, setDeck] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadDeck() {
      return API.get("decks", `/decks/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const deck = await loadDeck();
        const { content, attachment } = deck;

        if (attachment) {
          deck.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setDeck(deck);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
  return content.length > 0;
}

function formatFilename(str) {
  return str.replace(/^\w+-/, "");
}

function handleFileChange(event) {
  file.current = event.target.files[0];
}

function saveDeck(deck) {
  return API.put("decks", `/decks/${props.match.params.id}`, {
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
      content,
      attachment: attachment || deck.attachment
    });
    props.history.push("/");
  } catch (e) {
    alert(e);
    setIsLoading(false);
  }
}

function deleteDeck() {
  return API.del("decks", `/decks/${props.match.params.id}`);
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
    props.history.push("/");
  } catch (e) {
    alert(e);
    setIsDeleting(false);
  }
}

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
  );
}

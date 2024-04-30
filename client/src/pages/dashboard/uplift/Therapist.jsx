import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FiHelpCircle } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Therapist = () => {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showRelatedQuestions, setShowRelatedQuestions] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [userName, setUserName] = useState("");

  const questions = [
    `How was your day${userName}`,
    `What happened?${userName}`,
    `It is okay ${userName}.`,
    `I am able to understand ${userName} `,
  ];

  useEffect(() => {
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    };

    // Triggering voice assistant response based on user input
    if (content.trim() !== "") {
      handleAssistantResponse(questions[questionIndex]);
    }
  }, [content, questionIndex, userName]);

  const handleAssistantResponse = async (query) => {
    const responses = [
      `${userName}`,
      `I'm sorry to hear that${userName}. Do you want to talk about it?`,
      `I understand ${userName}. Remember, it's okay not to be okay sometimes.`,
      `Great${userName}! If you need anything else, feel free to ask.`,
    ];

    const index = questions.indexOf(query);
    const assistantResponse = responses[index];

    speak(assistantResponse);
    setResponse(assistantResponse);

    if (index < questions.length - 1) {
      setQuestionIndex(index + 1);
    }

    setShowRelatedQuestions(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContent("");
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleFindSupport = () => {
    window.location.href =
      "https://blog.opencounseling.com/hotlines-in/";
  };

  const handleSearchSupport = () => {
    window.location.href =
      "https://www.thelivelovelaughfoundation.org/find-help/helplines";
  };

  return (
    <Container>
      <Row>
        <Col style={{ margin: "auto" }} xs={12} md={6}>
          <Card className="shadow mt-5">
            <Card.Body>
              <div style={{ height: "300px", overflowY: "scroll" }}>
                {response}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="shadow mt-5">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="textEntry">
              <Form.Label>
                Write about your problems, ask solutions, or just vent out.
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder={questions[questionIndex]}
                rows={5}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userNameEntry">
              <Form.Label>Enter your name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="global-theme-button mr-3"
            >
              Submit
            </Button>
            <FiHelpCircle
              size={48}
              className="nurse-icon"
              onClick={() =>
                handleAssistantResponse(questions[questionIndex])
              }
            />
          </Form>
        </Card.Body>
      </Card>

      <div className="mt-5">
        <h2>Connect with Care Leavers Around India</h2>
        <a
          href="YOUR_WHATSAPP_GROUP_LINK"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="secondary"
            className="global-theme-button mr-3"
          >
            Connect with Care Leavers
          </Button>
        </a>
      </div>
      <div className="mt-3">
        <h2>Find Support Across India</h2>
        <Button
          variant="secondary"
          onClick={handleFindSupport}
          className="global-theme-button mr-3"
        >
          Find Support Across India
        </Button>
      </div>
      <div className="mt-3">
        <h2>Search for Support</h2>
        <Button
          variant="secondary"
          onClick={handleSearchSupport}
          className="global-theme-button"
        >
          Search for Support
        </Button>
      </div>
      <footer className="bg-light py-3 mt-5">
        {/* <Container>
          <p className="text-center">Powered by OpenAI's GPT-3.5</p>
        </Container> */}
      </footer>
    </Container>
  );
};

export default Therapist;

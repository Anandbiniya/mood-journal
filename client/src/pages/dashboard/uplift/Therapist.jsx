import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUserNurse } from "react-icons/fa";

const Therapist = () => {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showRelatedQuestions, setShowRelatedQuestions] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);

  // Array of questions
  const questions = ["How was your day?", "What happened?", "It is okay.", "I am able to understand."];

  useEffect(() => {
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    };

    // Speak the first question when the component mounts
    speak(questions[0]);
  }, []);

  const handleAssistantResponse = async (query) => {
    const responses = [
      "My day is going well, thank you for asking!",
      "I'm sorry to hear that. Do you want to talk about it?",
      "I understand. Remember, it's okay not to be okay sometimes.",
      "Great! If you need anything else, feel free to ask."
    ];

    // Get the index of the current question
    const index = questions.indexOf(query);

    // Get the corresponding response
    const assistantResponse = responses[index];

    // Speak the assistant's response
    speak(assistantResponse);

    // Set the assistant's response in the state
    setResponse(assistantResponse);

    // Increment the question index if there are more questions
    if (index < questions.length - 1) {
      setQuestionIndex(index + 1);
    }

    setShowRelatedQuestions(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Trigger the voice assistant's response
      handleAssistantResponse(questions[questionIndex]);
    } catch (error) {
      console.error("Error processing assistant response:", error);
      setResponse("Sorry, something went wrong while processing your request.");
    } finally {
      setContent("");
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
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
            <Button
              variant="primary"
              type="submit"
              className="global-theme-button mr-3"
            >
              Submit
            </Button>
            <FaUserNurse
              size={48}
              onClick={() => handleAssistantResponse(questions[questionIndex])}
              style={{ cursor: "pointer" }}
            />
          </Form>
        </Card.Body>
      </Card>
      {showRelatedQuestions && (
        <div className="mt-5">
          <h2>Follow-up Questions</h2>
          <ul>
            {relatedQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-5">
        <h2>Connect with Care Leavers Around India</h2>
        <Button
          variant="secondary"
          onClick={() => handleAssistantResponse("Connect with Care Leavers")}
          className="global-theme-button mr-3"
        >
          Connect with Care Leavers
        </Button>
      </div>
      <div className="mt-3">
        <h2>Find Support Across India</h2>
        <Button
          variant="secondary"
          onClick={() => handleAssistantResponse("Find Support Across India")}
          className="global-theme-button mr-3"
        >
          Find Support Across India
        </Button>
      </div>
      <div className="mt-3">
        <h2>Search for Support</h2>
        <Button
          variant="secondary"
          onClick={() => handleAssistantResponse("Search for Support")}
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

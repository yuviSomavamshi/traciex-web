import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

const tabs = [{ id: 1, label: "Click here to view", description: "Content of Tab 1" }];

export default function AccordionClass() {
  return (
    <div className="App">
      {tabs.map((tab) => (
        <Accordion key={tab.id}>
          <Accordion.Toggle as={Button} variant="link" eventKey={tab.id}>
            {tab.label}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={tab.id}>
            <Card.Body>
              <p>One</p>
              <p>One</p>
              <p>One</p>
              <p>One</p>
              <p>One</p>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      ))}
    </div>
  );
}

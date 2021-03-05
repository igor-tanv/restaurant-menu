import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

import { apiFetch } from "../../modules/api-fetch";

type CardProps = {
  item: string;
  name: string;
  price: number;
};

export default function Menu() {
  useEffect(() => {
    apiFetch("menu").then((text) => console.log(13, text));
  }, []);

  return (
    <Card className="card-container blog-card">
      <Card.Body className="pt-3">
        <Card.Title>
          <h4>Type</h4>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Name</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

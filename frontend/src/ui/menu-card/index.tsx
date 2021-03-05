import React from "react";
import Card from "react-bootstrap/Card";

type CardProps = {
  item: string;
  name: string;
  price: number;
};

export default function MenuCard({ item, name, price }: CardProps) {
  return (
    <Card className="card-container blog-card">
      <Card.Body className="pt-3">
        <Card.Title>
          <h4>{name}</h4>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

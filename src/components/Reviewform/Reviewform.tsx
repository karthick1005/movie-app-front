import React, { ForwardedRef } from "react";
import { Form, Button } from "react-bootstrap";
interface Formdata {
  handleSumbit: (e: any) => void;
  revText: ForwardedRef<HTMLTextAreaElement>;
  labelText: string;
  defaultValue: string;
}
const Reviewform: React.FC<Formdata> = ({
  handleSumbit,
  revText,
  labelText,
  defaultValue,
}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{labelText}</Form.Label>
        <Form.Control
          ref={revText}
          as="textarea"
          rows={3}
          defaultValue={defaultValue}
        />
      </Form.Group>
      <Button variant="outline-info" onClick={handleSumbit}>
        Sumbit
      </Button>
    </Form>
  );
};

export default Reviewform;

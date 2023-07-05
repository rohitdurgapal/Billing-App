import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
const Salesfields = ({
  handleAction,
  name,
  setName,
  mobile,
  setMobile,
  address,
  setAddress,
  removeSelectedItem,
  addSelectedItem,
  selectedItem,
  updateQuantity,
  updateDiscount,
  items,
  count,
  total,
  discount,
  netPrice,
  flag,
}) => {
  return (
    <>
      <h3>Add Sale</h3>
      <Form>
        <Row>
          <Col xs={2}>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
          <Col xs={4}>
            <Multiselect
              displayValue="codeName"
              onRemove={(e) => removeSelectedItem(e)}
              onSelect={(e) => addSelectedItem(e)}
              options={items}
              placeholder="Item Code"
              selectedValues={selectedItem}
            />
          </Col>
          <Col xs={2}>
            <Button variant="primary" type="button" onClick={handleAction} disabled={flag}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Item Code</th>
            <th>Item Price</th>
            <th className="right-text">Quantity</th>
            <th className="right-text">Net Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedItem?.map((c) => (
            <tr key={c._id}>
              <td>{++count}</td>
              <td>{c.name}</td>
              <td>{c.code}</td>
              <td>{c.price}</td>
              <td className="right-text">
                <Form.Control
                  style={{
                    width: "60px",
                    textAlign: "center",
                    float: "right",
                  }}
                  type="number"
                  value={c.quantity}
                  placeholder="Quantity"
                  onChange={(e) => updateQuantity(c._id, e.target.value)}
                />
              </td>
              <td className="right-text">{c.quantity * c.price}</td>
            </tr>
          ))}
          {total !== 0 && (
            <>
              <tr>
                <td colSpan={5} className="bold-text">
                  Total
                </td>
                <td className="bold-text">{total}</td>
              </tr>
              <tr>
                <td colSpan={6} className="bold-text">
                  <Form.Control
                    style={{
                      width: "100px",
                      textAlign: "right",
                      display: "inline",
                    }}
                    type="number"
                    value={discount}
                    placeholder="Discount"
                    onChange={(e) => updateDiscount(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="bold-text">
                  Net Price
                </td>
                <td className="bold-text">{netPrice}</td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Salesfields;

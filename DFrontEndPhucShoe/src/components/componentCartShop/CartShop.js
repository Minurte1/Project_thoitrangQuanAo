import React, { useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import "./CartShop.css";
const ShoppingCart = ({ handleClose, handleShow, show }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg" // Thay đổi thành "sm", "lg", hoặc "xl" theo nhu cầu
        aria-labelledby="example-custom-modal-styling-title"
        style={{
          height: "100vh", // Chiều cao của modal
          border: "none",
          borderRadius: 0,
          backgroundColor: "transparent",
        }}
        className="custom-modal" // Thêm class tùy chỉnh
      >
        <div className="container  h-100 div-cart">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-md-12">
              <div className="row">
                <div className="col-lg-7">
                  <h5 className="mb-3">
                    <a href="#!" className="text-body">
                      <i className="fas fa-long-arrow-alt-left me-2"></i>
                      Tiếp tục mua sắm
                    </a>
                  </h5>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <p className="mb-1">Giỏ hàng</p>
                      <p className="mb-0">Bạn có 4 mặt hàng trong giỏ hàng</p>
                    </div>
                    <div>
                      <p className="mb-0">
                        <span className="text-muted">Sắp xếp theo:</span>
                        <a href="#!" className="text-body">
                          {" "}
                          giá <i className="fas fa-angle-down mt-1"></i>
                        </a>
                      </p>
                    </div>
                  </div>
                  {/* Card Items */}
                  {[
                    {
                      title: "Iphone 11 pro",
                      description: "256GB, Navy Blue",
                      quantity: 2,
                      price: 900,

                      imgSrc:
                        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp",
                    },
                    {
                      title: "Samsung galaxy Note 10",
                      description: "256GB, Navy Blue",
                      quantity: 2,
                      price: 900,
                      imgSrc:
                        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp",
                    },
                    {
                      title: "Canon EOS M50",
                      description: "Onyx Black",
                      quantity: 1,
                      price: 1199,
                      imgSrc:
                        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp",
                    },
                    {
                      title: "MacBook Pro",
                      description: "1TB, Graphite",
                      quantity: 1,
                      price: 1799,
                      imgSrc:
                        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp",
                    },
                  ].map((item, index) => (
                    <div className="card mb-3" key={index}>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <img
                                src={item.imgSrc}
                                className="img-fluid rounded-3 img-fluid"
                                alt="Shopping item"
                                style={{ width: "65px" }}
                              />
                            </div>
                            <div className="ms-3">
                              <h5>{item.title}</h5>
                              <p className="small mb-0">{item.description}</p>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ width: "50px" }}>
                              <h5 className="fw-normal mb-0">
                                {item.quantity}
                              </h5>
                            </div>
                            <div style={{ width: "80px" }}>
                              <h5 className="mb-0">${item.price}</h5>
                            </div>
                            <a href="#!" style={{ color: "#cecece" }}>
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </div>
                        </div>
                      </Card.Body>
                    </div>
                  ))}
                </div>
                <div className="col-lg-5">
                  <Card className="bg-primary text-white rounded-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Chi tiết thẻ</h5>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                          className="img-fluid rounded-3 img-fluid"
                          style={{ width: "45px" }}
                          alt="Avatar"
                        />
                      </div>
                      <p className="small mb-2">Loại thẻ</p>
                      <a href="#!" className="text-white">
                        <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-cc-visa fa-2x me-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-cc-amex fa-2x me-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-cc-paypal fa-2x"></i>
                      </a>
                      <Form className="mt-4">
                        <Form.Group className="form-outline form-white mb-4">
                          <Form.Control
                            type="text"
                            id="typeName"
                            placeholder="Tên chủ thẻ"
                          />
                          <Form.Label htmlFor="typeName">
                            Tên chủ thẻ
                          </Form.Label>
                        </Form.Group>
                        <Form.Group className="form-outline form-white mb-4">
                          <Form.Control
                            type="text"
                            id="typeText"
                            placeholder="1234 5678 9012 3457"
                            minLength={19}
                            maxLength={19}
                          />
                          <Form.Label htmlFor="typeText">Số thẻ</Form.Label>
                        </Form.Group>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <Form.Group className="form-outline form-white">
                              <Form.Control
                                type="text"
                                id="typeExp"
                                placeholder="MM/YYYY"
                                minLength={7}
                                maxLength={7}
                              />
                              <Form.Label htmlFor="typeExp">
                                Hạn sử dụng
                              </Form.Label>
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group className="form-outline form-white">
                              <Form.Control
                                type="password"
                                id="typeCvv"
                                placeholder="&#9679;&#9679;&#9679;"
                                minLength={3}
                                maxLength={3}
                              />
                              <Form.Label htmlFor="typeCvv">Cvv</Form.Label>
                            </Form.Group>
                          </div>
                        </div>
                      </Form>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Tổng tiền</p>
                        <p className="mb-2">$4798.00</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Phí vận chuyển</p>
                        <p className="mb-2">$20.00</p>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <p className="mb-2">Tổng cộng (bao gồm thuế)</p>
                        <p className="mb-2">$4818.00</p>
                      </div>
                      <Button variant="info" className="btn-block btn-lg">
                        <div className="d-flex justify-content-between">
                          <span>$4818.00</span>
                          <span>
                            Thanh toán{" "}
                            <i className="fas fa-long-arrow-alt-right ms-2"></i>
                          </span>
                        </div>
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShoppingCart;

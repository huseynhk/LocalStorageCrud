import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import UpdateCard from "./UpdateCard";
import Cards from "./Cards";
import { toast } from "react-toastify";

const Crud = () => {
  const [cartItems, setCartItems] = useState([]);
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [age, setAge] = useState(0);
  const [show, setShow] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const addItemCart = () => {
    if (!fullName || !nickName || !age) {
      toast.error("Please fill in all fields before adding to the cart!", {
        autoClose: 1500,
      });
      return;
    }
    const newItem = { id: new Date().getTime(), fullName, nickName, age };
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem("cartItem", JSON.stringify(updatedCart));
    setFullName("");
    setNickName("");
    setAge(0);
    toast.success("User added to cart!", { autoClose: 1500 });
  };
  const openModal = (item) => {
    setShow(true);
    setEditedItem(item);
  };

  const closeModal = () => {
    setShow(false);
    setEditedItem(null);
  };

  const removeAllItems = () => {
    setCartItems([]);
    localStorage.removeItem("cartItem");
    toast.success("All Users removed from cart!", { autoClose: 1500 });
  };

  const removeItemFromCart = (id) => {
    const deletedItem = cartItems.filter((cart) => cart.id !== id);
    setCartItems(deletedItem);
    localStorage.setItem("cartItem", JSON.stringify(deletedItem));
    toast.success("User removed from cart!", { autoClose: 1500 });
  };

  const saveEdit = () => {
    if (!editedItem.fullName || !editedItem.nickName || !editedItem.age) {
      toast.error("Please fill in all fields before saving!", {
        autoClose: 1500,
      });
      return;
    }
    const updatedItem = cartItems.map((cart) =>
      cart.id === editedItem.id ? { ...editedItem } : cart
    );
    setCartItems(updatedItem);
    localStorage.setItem("cartItem", JSON.stringify(updatedItem));
    toast.success("User updated successfully!", { autoClose: 1500 });
    closeModal();
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItem");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <>
      <div className="container d-flex flex-column align-items-center ">
        <h1 className="text-white mt-2">Add User</h1>
        <div className="d-flex flex-column align-items-center my-3">
          <input
            type="text"
            placeholder="FullName"
            className="my-1 px-4 py-1 rounded-2"
            value={fullName}
            onChange={(e) => {
              console.log("FullName", e.target.value);
              setFullName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="NickName"
            value={nickName}
            className="my-1 px-4 py-1 rounded-2"
            onChange={(e) => {
              console.log("setNickName", e.target.value);
              setNickName(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            className="my-1 px-4 py-1 rounded-2"
            onChange={(e) => {
              console.log("setNickName", e.target.value);
              setAge(e.target.value);
            }}
          />
          <div>
            <Button className="m-1" onClick={addItemCart}>
              Add to Cart
            </Button>
            <Button className="m-1" variant="danger" onClick={removeAllItems}>
              Remove All
            </Button>
          </div>
        </div>

        <Row>
          {cartItems.map((cart) => (
            <Cards
              key={cart.id}
              id={cart.id}
              fullName={cart.fullName}
              nickName={cart.nickName}
              age={cart.age}
              openModal={openModal}
              removeItemFromCart={removeItemFromCart}
            />
          ))}
        </Row>
      </div>
      <UpdateCard
        show={show}
        closeModal={closeModal}
        editedItem={editedItem}
        setEditedItem={setEditedItem}
        saveEdit={saveEdit}
      />
    </>
  );
};

export default Crud;

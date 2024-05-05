import React, { useRef, useContext } from "react";
import { useMutation } from "react-query";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import { createMenuitem } from "../api/menuitems";
import { AuthContext } from "../../shared/context/auth-context";

import './AddMenuitem.css';

const AddMenuitem = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);

  const createMenuitemMutation = useMutation({
    mutationFn: createMenuitem
  });

  const menuitemSubmitHandler = async event => {
    event.preventDefault();
    createMenuitemMutation.mutate({
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      token: auth.token
    })
  };

  return (
    <form className="menuitem-form" onSubmit={menuitemSubmitHandler}>
      <Input id="name" ref={nameRef} type="text" label="Name" />
      <Input id="price" ref={priceRef} type="text" label="Price" />
      <Input id="description" ref={descriptionRef} type="text" label="Description" />
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      <Button type="submit">
        Add Menuitem
      </Button>
    </form>
  )
};

export default AddMenuitem;
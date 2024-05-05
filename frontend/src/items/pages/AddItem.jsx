import React, { useRef, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router'

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import { createItem } from "../api/items";
import { AuthContext } from "../../shared/context/auth-context";

import './AddItem.css';

const AddItem = () => {
  const titleRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);

  const navigate = useNavigate()

  const createItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const itemSubmitHandler = async event => {
    event.preventDefault();
    createItemMutation.mutate({
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      owner: auth.userName,
      token: auth.token
    })
  };

  return (
    <form className="item-form" onSubmit={itemSubmitHandler}>
      <Input id="title" ref={titleRef} type="text" label="Title" />
      <Input id="price" ref={priceRef} type="text" label="Price (cents required 100.00)" />
      <Input id="description" ref={descriptionRef} type="text" label="Description" />
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      <Button type="submit">
        Add Item
      </Button>
    </form>
  )
};

export default AddItem;
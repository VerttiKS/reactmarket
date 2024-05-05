import React, { useRef, useState, useContext } from "react";
import { useMutation } from 'react-query';

import Card from '../../shared/components/Card';
import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import Input from "../../shared/components/Input";

import './ItemsItem.css';
import { AuthContext } from "../../shared/context/auth-context";
import { deleteItem } from "../api/items";

const ItemsItem = props => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const showEditHandler = () => setShowEditModal(true);
  const cancelEditHandler = () => setShowEditModal(false);


  const titleRef = useRef(props.title);
  const priceRef = useRef(props.price);
  const descriptionRef = useRef(props.description);
  const imageRef = useRef(props.image);


  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    deleteItemMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }

  const editItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const editConfirmedHandler = () => {
    setShowConfirmationModal(false);
    editItemMutation.mutate({
      id: props.id,
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      owner: auth.userName,
      token: auth.token
    })
  }


  return(
  <>
      <Modal
      show={showEditModal}
      header="Editing?"
      footerClass="place-item__modal-actions"
      footer={
        <React.Fragment>
              <form className="item-form" onSubmit={editConfirmedHandler}>
                <Input id="title" ref={titleRef} type="text" label="Title" defaultValue="test" key="test"/>
                <Input id="price" ref={priceRef} type="text" label="Price" />
                <Input id="description" ref={descriptionRef} type="text" label="Description" />
                <Input id="image" ref={imageRef} type="text" label="Image Link" />
                <Button type="submit">
                  Edit Item
                </Button>
              </form>
              <Button inverse onClick={cancelEditHandler}>Cancel</Button>
        </React.Fragment>
      }
    >
      <p>Do you want to edit?</p>
    </Modal>
    <Modal
      show={showConfirmationModal}
      header="Are you sure?"
      footerClass="place-item__modal-actions"
      footer={
        <React.Fragment>
          <Button inverse onClick={cancelConfirmationHandler}>Cancel</Button>
          <Button delete onClick={deleteConfirmedHandler}>Delete</Button>
        </React.Fragment>
      }
    >
      <p>Are you sure? Once it's gone, it's gone!</p>
    </Modal>

    <li className="item-item">
      <Card className="item-item__content">
        <div className="item-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="item-item__info">
          <h3>{props.title} - {props.price}</h3>
        </div>
        <div className="item-item_actions">

        
        {auth.isLoggedIn && auth.userName == props.owner && (
            <Button edit onClick={showEditHandler}>Edit</Button>
          )}
          {auth.isLoggedIn && auth.userName == props.owner && (
            <Button danger onClick={showConfirmationHandler}>Delete</Button>
          )}
        </div>
      </Card>
    </li>
  </>
  )
};

export default ItemsItem;
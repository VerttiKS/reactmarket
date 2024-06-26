import React, { useRef, useState, useContext } from "react";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router'

import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import Input from "../../shared/components/Input";

import './ItemsItem.css';
import { AuthContext } from "../../shared/context/auth-context";
import { deleteItem, editItem } from "../api/items";

const ItemsItem = props => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const showEditHandler = () => setShowEditModal(true);
  const cancelEditHandler = () => setShowEditModal(false);

  const navigate = useNavigate()

  const titleRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();


  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = async event => {
    setShowConfirmationModal(false);
    await deleteItemMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }

  const editItemMutation = useMutation({
    mutationFn: editItem,
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const editConfirmedHandler = async event => {
    setShowEditModal(false);
    event.preventDefault();
    editItemMutation.mutate({
      id: props.id,
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      owner: auth.userName,
      token: auth.token
    })
  };

  return(
  <>
      <Modal
      show={showEditModal}
      header="Editing?"
      footerClass="place-item__modal-actions"
      footer={
        <React.Fragment>
              <form className="item-form" onSubmit={editConfirmedHandler}>
                <Input id="title" ref={titleRef} type="text" label="Title" defaultValue={props.title}/>
                <Input id="price" ref={priceRef} type="text" label="Price" defaultValue={props.price}/>
                <Input id="description" ref={descriptionRef} type="text" label="Description" defaultValue={props.description}/>
                <Input id="image" ref={imageRef} type="text" label="Image Link" defaultValue={props.image}/>
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
    {auth.isLoggedIn && auth.userName == props.owner && (
    <li className="productItem__list-item">
      <div className="productDisplay">
        <img className="productItem__list-item__image" src={props.image}></img>
        <section className='productItem__list-item__section'>
          <h2>{props.title}</h2>
        </section>
      </div>
      <div className="productDisplayButton">
            <Button edit onClick={showEditHandler}>Edit</Button>
          
   
            <Button danger onClick={showConfirmationHandler}>Delete</Button>
        </div>

    </li>

    )}
  </>
  )
};

export default ItemsItem;
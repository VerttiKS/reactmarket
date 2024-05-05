import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';

import Card from '../../shared/components/Card';
import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";

import './ItemsItem.css';
import { AuthContext } from "../../shared/context/auth-context";
import { deleteItem } from "../api/items";

const ItemsItem = props => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

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


  return(
  <>
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

          <Button>Edit</Button>
          {auth.isLoggedIn && (
            <Button danger onClick={showConfirmationHandler}>Delete</Button>
          )}
        </div>
      </Card>
    </li>
  </>
  )
};

export default ItemsItem;
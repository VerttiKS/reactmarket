import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';

import Card from '../../shared/components/Card';
import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";

import './MenuitemsItem.css';
import { AuthContext } from "../../shared/context/auth-context";
import { deleteMenuitem } from "../api/menuitems";

const MenuitemsItem = props => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteMenuitemMutation = useMutation({
    mutationFn: deleteMenuitem,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    console.log("Do we get here?");
    deleteMenuitemMutation.mutate({
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
    <li className="menuitem-item">
      <Card className="menuitem-item__content">
        <div className="menuitem-item__image">
          <img src={props.image} alt={props.name} />
        </div>
        <div className="menuitem-item__info">
          <h3>{props.name} - {props.price}</h3>
        </div>
        <div className="menuitem-item_actions">

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

export default MenuitemsItem;
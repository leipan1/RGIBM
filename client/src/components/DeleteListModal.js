import React, { Component, useContext } from 'react';
import { GlobalStoreContext } from '../store'

function DeleteListModal(){
    const { store } = useContext(GlobalStoreContext);
    let name=""
    console.log("TESTING:::::::::::")
    console.log(store.markForDeletion)
    if(store.markForDeletion){
        console.log(store.markForDeletion._id)
        name=store.markForDeletion.name;
        console.log("name:"+store.markForDeletion.name)
    }

    
    function handleConfirmDeleteList(){
        console.log("confirm delete")
        store.deleteList();
        store.hideDeleteListModal();
    }


    function handleCancelDeleteList(){
        console.log("cancel delete")
        store.hideDeleteListModal();
    }


    return (
        <div 
            className="modal"
            id="delete-list-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root modal-dialog" id='verify-delete-list-root'>
                <div className="modal-north dialog-header ">
                    Delete the {name} playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the {name} playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={handleConfirmDeleteList} value='Confirm' />
                    <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={handleCancelDeleteList} value='Cancel' />
                </div>
            </div>
        </div>
    );
}
export default DeleteListModal
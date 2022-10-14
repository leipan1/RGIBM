import React, { Component, useContext } from 'react';
import { GlobalStoreContext } from '../store'

function EditSongModal(){
    const { store } = useContext(GlobalStoreContext);

    
    function handleConfirmDeleteList(){
        store.editSong(document.getElementById("newTitle").value,document.getElementById("newArtist").value,document.getElementById("newYTID").value, store.markForEdit);
        store.hideEditSongModal();
    }


    function handleCancelDeleteList(){
        store.hideEditSongModal();
    }


    return (
        <div 
            className="modal"
            id="edit-song-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root modal-dialog" id='verify-delete-list-root'>
                <div className="modal-north modal-header ">
                    Edit song?
                </div>
                <table class="modal-center-edit">
                    <td>Title:</td>
                    <td><input type="text" id="newTitle"></input></td>
                    <td>Artist:</td>
                    <td><input type="text" id="newArtist"></input></td>
                    <td>YouTube ID:</td>
                    <td><input type="text" id="newYTID"></input></td>
                </table>
                <div className="modal-south modal-footer" id="confirm-cancel-container">
                    <input type="button" id="remove-song-confirm-button" className="modal-button modal-control" onClick={handleConfirmDeleteList} value='Confirm' />
                    <input type="button" id="remove-song-cancel-button" className="modal-button modal-control" onClick={handleCancelDeleteList} value='Cancel' />
                </div>
            </div>
        </div>
    );
}
export default EditSongModal
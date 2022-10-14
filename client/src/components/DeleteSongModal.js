import React, { Component, StrictMode, useContext } from 'react';
import { GlobalStoreContext } from '../store'

function DeleteSongModal(){
    const { store } = useContext(GlobalStoreContext);
    let title=""
    console.log("delete song modal")
    console.log(store.markForDeletionSong)
    if(store.markForDeletionSong >=0){
        console.log(":))")
        title=store.currentList.songs[store.markForDeletionSong].title;
    }

    
    function handleConfirmDeleteList(){
        store.deleteSong();
        store.hideDeleteSongModal();
    }


    function handleCancelDeleteList(){
        store.hideDeleteSongModal();
    }


    return (
        <div 
            className="modal"
            id="delete-song-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root modal-dialog" id='verify-delete-list-root'>
                <div className="modal-north modal-header ">
                    Delete song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently remove {title} from the playlist?
                    </div>
                </div>
                <div className="modal-south modal-footer" id="confirm-cancel-container">
                    <input type="button" id="remove-song-confirm-button" className="modal-button modal-control" onClick={handleConfirmDeleteList} value='Confirm' />
                    <input type="button" id="remove-song-cancel-button" className="modal-button modal-control" onClick={handleCancelDeleteList} value='Cancel' />
                </div>
            </div>
        </div>
    );
}
export default DeleteSongModal
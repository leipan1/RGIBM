import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteListModal from './DeleteListModal'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    // const {deleteListCallback}=this.props

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    // function showDeleteListModal(){
    //     alert("SHOW DELETE LIST MODAL")
    // }

    
    //add props
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
                // deleteListCallback={deleteListCallback}
            />
        ))
    }
    
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className="playlister-button"
                    value="+" />
                Your Lists
            </div>                
                {
                    /* <listCard
                        deleteListCallback={this.showDeleteListModal}
                    /> */
                    listCard

                }
                <DeleteListModal
                    // isOpenCallback={this.isDeleteListModalOpen}
                    // hideModalCallback={this.hideModal}
                    // listKeyPair={this.state.listKeyPairMarkedForDeletion}
                    // deleteListCallback={this.deleteMarkedList}
                />
            </div>
        </div>)
}

export default ListSelector;
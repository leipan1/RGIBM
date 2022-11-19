import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    // useEffect(() => {
    //     store.loadIdNamePairs();
    // }, []);

    // function handleCreateNewList() {
    //     store.createNewList();
    // }


    
    //add props
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading">
                Filter
            </div>                
                {/* {
                    listCard

                } */}
            </div>
        </div>)
}

export default ListSelector;
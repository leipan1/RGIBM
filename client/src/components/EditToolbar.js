import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS';
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";
    

    let tps=new jsTPS();

    let undoClass=enabledButtonClass
    let redoClass=enabledButtonClass
    let addSongClass=enabledButtonClass
    let closeClass=enabledButtonClass

    // let canUndo= tps.hasTransactionToUndo();
    // let canRedo= tps.hasTransactionToRedo();
    // let canAddSong= store.currentList!==null;
    // let canClose= store.currentList!==null;
    
    if(!store.canUndo){
        console.log("no undo")
        undoClass += "-disabled"
    }
    if(!store.canRedo){
        redoClass += "-disabled"
    }
    if(store.currentList===null){
        addSongClass += "-disabled"
    }
    if(store.currentList===null){
        closeClass += "-disabled"
    }


    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleAddSong(){
        store.addAddSongTransaction();

    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
        
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={addSongClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;
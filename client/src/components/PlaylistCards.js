import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import { useCallback, useEffect } from 'react';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    
    const handleKeyPress = useCallback((event) => {
        if(event.ctrlKey){
            if(event.key==="z"){
                if(store.canUndoCheck()){
                    //console.log("can undo")
                    store.undo()
                }
            }
            else if(event.key==="y"){
                if(store.canRedoCheck()){
                    //console.log("can undo")
                    store.redo()
                }
            }
        }
      }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);
    


    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
        }
        </div>
    )
}

export default PlaylistCards;
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import DeleteSongModal from './DeleteSongModal'
import EditSongModal from './EditSongModal'
import jsTPS from '../common/jsTPS.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    // function keydownHandler(e){
    //     let tps=new jsTPS()
    //     if(e.keyCode===90 && e.ctrlKey){
    //         alert("undo")
    //         if (tps.hasTransactionToUndo()){
    //             this.undo()
    //         }
            
    //     }
    //     if(e.keyCode===89 && e.ctrlKey){
    //         if(tps.hasTransactionToRedo())
    //             this.redo()
    //     }
    // }

    // function componentDidMount(){
    //     document.addEventListener('keydown',keydownHandler());
    // }

    // function componentWillUnmount(){
    //     document.removeEventListener('keydown',keydownHandler());
    // }

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
        <DeleteSongModal/>
        <EditSongModal/>
        </div>
    )
}

export default PlaylistCards;
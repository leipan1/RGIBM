import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * @author McKilla Gorilla
 * @author leipan
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store,index) {
        super();
        this.store = store;
        this.index=index;
        this.oldTitle=this.store.currentList.songs[this.index].title
        this.oldArtist=this.store.currentList.songs[this.index].artist
        this.oldYTID=this.store.currentList.songs[this.index].youTubeId
    }

    doTransaction() {
        this.store.markSongForDeletion(this.index)
        //console.log("finish marking song for deletion")
        //TODO:: IF THERE IS REDO, DONT SHOW MODAL!!
        this.store.showDeleteSongModal()
    }
    
    undoTransaction() {
        this.store.addSong()
        let length=this.store.getPlaylistSize()
        this.store.moveSong(length-1,this.index)
        this.store.markSongForEdit(this.index)
        //console.log("finish marking song for edit:"+this.store.markForEdit)
        this.store.editSong(this.oldTitle,this.oldArtist,this.oldYTID)
    }
}
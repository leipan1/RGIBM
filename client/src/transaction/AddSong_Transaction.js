import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * @author McKilla Gorilla
 * @author leipan
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
    }

    doTransaction() {
        this.store.addSong();
    }
    
    undoTransaction() {
        this.store.markSongForDeletion(this.store.getPlaylistSize())
        this.store.deleteSong()
    }
}
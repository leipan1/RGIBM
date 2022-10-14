import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * @author McKilla Gorilla
 * @author leipan
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, OldSongIndex, NewSongIndex) {
        super();
        this.store = store;
        this.oldSongIndex = OldSongIndex;
        this.newSongIndex = NewSongIndex;
    }

    doTransaction() {
        this.store.moveSong(this.oldSongIndex, this.newSongIndex);
    }
    
    undoTransaction() {
        this.store.moveSong(this.newSongIndex, this.oldSongIndex);
    }
}
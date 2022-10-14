import { createContext, startTransition, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSong_Transaction from '../transaction/AddSong_Transaction';
import DeleteSong_Transaction from '../transaction/DeleteSong_Transaction';
import EditSong_Transaction from '../transaction/EditSong_Transaction';
import MoveSong_Transaction from '../transaction/MoveSong_Transaction';


export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
    @author Leipan
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE


    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markForDeletion: null,
        markForDeletionSong:-1,
        markForEdit: -1,
        canUndo: false,
        canRedo: false,
    });


    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markForDeletion: store.markForDeletion,
                    markForDeletionSong:store.markForDeletionSong,
                    markForEdit: store.markForEdit,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markForDeletion: store.markForDeletion,
                    markForDeletionSong:store.markForDeletionSong,
                    markForEdit: store.markForEdit,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markForDeletion: store.markForDeletion,
                    markForDeletionSong:store.markForDeletionSong,
                    markForEdit: store.markForEdit,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markForDeletion: store.markForDeletion,
                    markForDeletionSong:store.markForDeletionSong,
                    markForEdit: store.markForEdit,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markForDeletion: payload,
                    markForDeletionSong:store.markForDeletionSong,
                    markForEdit: store.markForEdit,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                });
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION:{
                return setStore({
                    idNamePairs:store.idNamePairs,
                    currentList:store.currentList,
                    newListCounter:store.newListCounter,
                    listNameActive:false,
                    markForDeletion:store.markForDeletion,
                    markForDeletionSong:payload,
                    markForEdit: store.markForEdit,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT:{
                return setStore({
                    idNamePairs:store.idNamePairs,
                    currentList:store.currentList,
                    newListCounter:store.newListCounter,
                    listNameActive:false,
                    markForDeletion: store.markForDeletion,
                    markForDeletionSong:store.markForDeletionSong,
                    markForEdit:payload,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                })
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markForDeletion: store.markForDeletion,
                    markForDeletionSong:store.markForDeletionSong,
                    markForEdit: store.markForEdit,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markForDeletion: store.markForDeletion,
                    markForDeletionSong:store.markForDeletionSong,
                    markForEdit: store.markForEdit,
                    canUndo:tps.hasTransactionToUndo(),
                    canRedo:tps.hasTransactionToRedo(),
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;//TYPO??? was playist
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.editPlaylist(playlist._id, playlist);//CREATE API FOR THIS
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                                store.history.push("/")
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions()
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    //~~CREATE NEW LIST FUNCTION
    store.createNewList = function() {
        async function asyncCreateNewList(){
            let response= await api.createPlaylist();
            if(response.data.success){
                let playlistID=response.data.playlist._id
                async function asyncSetCurrentList(id){
                    let response=await api.getPlaylistById(id);
                    if(response.data.success){
                        let playlist= response.data.playlist;
                        if(response.data.success){
                            storeReducer({
                                type:GlobalStoreActionType.CREATE_NEW_LIST,
                                payload:playlist
                            });
                            store.history.push("/playlist/" + playlist._id);
                        }
                    }
                }asyncSetCurrentList(playlistID)
            }
        }
        asyncCreateNewList();
    }

    //~~DELETE LIST FUNCTION
    store.deleteList=function(){
        let playlist=store.markForDeletion
        // console.log("playlist that was marked:")
        // console.log(store.markForDeletion)
        async function asyncDeletePlaylist(playlist){
            let response = await api.deletePlaylist(playlist._id)
            if(response.data.success){
                async function reloadList(){
                    store.history.push("/");
                    store.loadIdNamePairs();
                }reloadList()
            }
        }asyncDeletePlaylist(playlist)

    }

    store.deleteSong=function(){
        let index=store.markForDeletionSong
        console.log("deleting song at index:"+index)
        store.currentList.songs.splice(index,1)
        // console.log("new list after deleting the song:")
        // console.log(store.currentList.songs)
        //store.markSongForDeletion(-1)
        store.markForDeletionSong=-1
        //console.log("new:::"+store.markForDeletionSong)
        async function asyncUpdatePlaylist(currentList){
            let response= await api.editPlaylist(currentList._id,currentList)
            if(response.data.success){
                storeReducer({
                    type:GlobalStoreActionType.SET_CURRENT_LIST,
                    payload:currentList
                })
            }
        }asyncUpdatePlaylist(store.currentList)
    }

    store.editSong=function(newTitle, newArtist, newYTID){
        let index=store.markForEdit
        //console.log("edit song index:"+store.markForEdit)
        // console.log("current list:")
        //console.log(store.currentList)
        store.currentList.songs[index].title=newTitle
        store.currentList.songs[index].artist=newArtist
        store.currentList.songs[index].youTubeId=newYTID
        async function asyncUpdatePlaylist(currentList){
            let response= await api.editPlaylist(currentList._id,currentList)
            if(response.data.success){
                storeReducer({
                    type:GlobalStoreActionType.SET_CURRENT_LIST,
                    payload:currentList
                })
            }
        }asyncUpdatePlaylist(store.currentList)
        console.log("edited song at index:"+index)
    }


    store.markListForDeletion= function (idNamePair){
        storeReducer({
            type:GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload:idNamePair
        })
    }

    store.markSongForDeletion= function (index){
        storeReducer({
            type:GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload:index
        })
        // storeReducer({
        //     type:GlobalStoreActionType.MARK_SONG_FOR_DELETION,
        //     payload:-1
        // })
    }

    store.markSongForEdit= function(index){
        storeReducer({
            type:GlobalStoreActionType.MARK_SONG_FOR_EDIT,
            payload:index
        })
        document.getElementById("newTitle").value=store.currentList.songs[index].title
        document.getElementById("newArtist").value=store.currentList.songs[index].artist
        document.getElementById("newYTID").value=store.currentList.songs[index].youTubeId
    }

    store.showDeleteListModal= function () {
        let modal=document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }

    store.showDeleteSongModal= function(){
        let modal=document.getElementById("delete-song-modal")
        modal.classList.add("is-visible");
    }
    store.showEditSongModal= function(){
        let modal= document.getElementById("edit-song-modal")
        modal.classList.add("is-visible")
    }

    store.hideDeleteListModal= function(){
        let modal=document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    store.hideDeleteSongModal= function(){
        let modal=document.getElementById("delete-song-modal")
        modal.classList.remove("is-visible");
    }
    
    store.hideEditSongModal=function(){
        let modal=document.getElementById("edit-song-modal")
        modal.classList.remove("is-visible")
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.addSong=function(){
        let currentList=store.currentList
        let newSong={
            title:"Untitled",
            artist:"Unknown",
            youTubeId:"dQw4w9WgXcQ"
        }
        currentList.songs.push(newSong)
        async function reloadList(currentList){
            let response=await api.editPlaylist(currentList._id,currentList)
            if(response.data.success){
                storeReducer({
                    type:GlobalStoreActionType.SET_CURRENT_LIST,
                    payload:currentList,
                })
            }
        }reloadList(currentList)
    }

    store.moveSong=function(sourceId,targetId){
        let list=store.currentList
        if(sourceId<targetId){
            let temp=list.songs[sourceId]
            for (let i = sourceId; i < targetId; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[targetId] = temp;
        }
        else if (sourceId>targetId){
            let temp = list.songs[sourceId];
            for (let i = sourceId; i > targetId; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[targetId] = temp;
        }
        async function reloadList(list){
            let response=await api.editPlaylist(list._id,list)
            if(response.data.success){
                storeReducer({
                    type:GlobalStoreActionType.SET_CURRENT_LIST,
                    payload:list,
                })
            }
        }reloadList(list)
    }

    store.addAddSongTransaction = function (){
        let transaction= new AddSong_Transaction(store)
        tps.addTransaction(transaction)
    }

    store.addDeleteSongTransaction=function(index){
        let transaction=new DeleteSong_Transaction(store,index)
        tps.addTransaction(transaction)
    }

    store.addEditSongTransaction=function(index){
        let transaction=new EditSong_Transaction(store,index)
        tps.addTransaction(transaction)
    }

    store.addMoveSongTransaction=function(oldIndex, newIndex){
        let transaction= new MoveSong_Transaction(store,oldIndex, newIndex)
        tps.addTransaction(transaction)
    }


    return { store, storeReducer };
}
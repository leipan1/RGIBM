import React, { Component, useContext } from 'react';
import { GlobalStoreContext } from '../store'

/*
    This is the modal that pops up when the "RANDOMNIZE" button is clicked
*/

function RecipeModal(){
    const {store} = useContext(GlobalStoreContext);
    console.log("generate recipe modal?"+store.showModal)
    let name=""
    let imageurl=""
    let url=""

    //populates variable with relavent information once a recipe has been randomly chosen
    if(store.showModal){
        name=store.chosenRecipe.name
        imageurl=store.chosenRecipe.imageurl
        url=store.chosenRecipe.url
    }

    //called when user clicks on the "CLOSE" button on the modal
    function handleCloseModal(){
        store.hideRecipeModal()
    }

    return(
        <div
            className='modal'
            id="recipe-modal"
        >
                <img src={imageurl} alt={name} class="recipe-image"/>
                <h4 class="recipe-name"><a href={url} target="_blank" rel="noreferrer noopener">{name}</a></h4>
                <input type="button" class="close-modal" onClick={handleCloseModal} value='Close'/>
        </div>
    )
}
export default RecipeModal
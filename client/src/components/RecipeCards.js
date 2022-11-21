import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function RecipeCards(props){

    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    const {idNamePair} = props;


    let cardElement = 
    <div id="recipe-card">
        <img src={props.idNamePair.imageurl} alt={props.idNamePair.name} class="recipe-image"/>
        <h4 class="recipe-card-name">
            <a href={props.idNamePair.url} target="_blank" rel="noreferrer noopener">{props.idNamePair.name}</a>
        </h4>
    </div>
    

    return(
        cardElement
    );
}

export default RecipeCards
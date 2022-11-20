import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import Ingredients from './Ingredients.json'
import RecipeModal from './RecipeModal'



const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();


    

    const handleSubmit=(event)=>{
        store.filterRecipes()
    }

    const handleCheckbox=(event)=>{
        if(event.target.checked){
            //console.log(event.target.value+" is checked")
            store.setCheckedIngredients(event.target.value)
        }
        else{
            //console.log(event.target.value+" is unchecked")
            store.uncheckIngredients(event.target.value)
        }
    }
    
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading">
                Filter
            </div>
            {
            Ingredients.map((val,key)=>{
                return <div className="ingredients" key={key}>
                    <p><input
                        type="checkbox"
                        name="ingredients"
                        value={val.ingredients}
                        onChange={handleCheckbox}
                    />
                    <label>{val.ingredients}</label>
                    </p>
                </div>
            })
            }
            <input id="submit-button" type="submit" value="Generate" onClick={handleSubmit}/>
            <RecipeModal/>
            </div>
        </div>)
}

export default ListSelector;
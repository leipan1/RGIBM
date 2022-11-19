import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import Ingredients from './Ingredients.json'



const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();


    

    const handleSubmit=(event)=>{
        let id="6378edaf4767837c1ab53a55"
        store.generateRecipeModal(id)
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
            <input type="submit" value="Generate" onClick={handleSubmit}/>

            </div>
        </div>)
}

export default ListSelector;
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import Ingredients from './Ingredients.json'



const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    

    

    const handleSubmit=(event)=>{
        console.log("uhhhhh:::")
        console.log(event.target.value)
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
                    />
                    <label>{val.ingredients}</label>
                    </p>
                </div>;
            })
            }
            <input type="submit" value="submit" onClick={handleSubmit}/>
            </div>
        </div>)
}

export default ListSelector;
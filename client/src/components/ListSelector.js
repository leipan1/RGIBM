import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import Ingredients from './Ingredients.json'
import RecipeModal from './RecipeModal'
import RecipeCards from './RecipeCards'




const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadRecipes();
        console.log("LOADING RECIPES NOW!")
    }, []);

    //add props
    let recipeCard="";
    if(store){
        if(store.recipes){
            console.log("EWUHUWEHCRUIWH")
            console.log(store.recipes)
            recipeCard=store.recipes.map((pair)=>(
            <RecipeCards
                idNamePair={pair}
            />
            ))
        }
    }

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

    const handleChooseRecipe=(event)=>{
        console.log("OOGGG")
        console.log(store.filteredRecipes.length)
        store.randomlySelectRecipe(store.filteredRecipes.length)
    }
    
    return (
        <div id="selector">
            <div id="recipe-list">
                {
                    recipeCard
                }
            </div>
            <div id="recipe-selector">
                <div id="recipe-selector-heading">
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
            </div>
            <input id="submit-button" type="submit" value="Generate" onClick={handleSubmit}/>
            <input id="random-button" type="submit" value="Randomnize" onClick={handleChooseRecipe}/>
            <RecipeModal/>
        </div>
        )
}

export default ListSelector;
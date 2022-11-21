import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import Ingredients from './Ingredients.json'
import RecipeModal from './RecipeModal'
import RecipeCards from './RecipeCards'

/*
    The UI for the main section of the application. This is user interaction with the application
    is defined
*/

const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    //loads all recipes upon startup of application
    useEffect(() => {
        store.loadRecipes();
        console.log("LOADING RECIPES NOW!")
    }, []);

    //adding props to the recipe card after all the recipes have been loaded/generated
    let recipeCard="";
    if(store){
        if(store.recipes){
            recipeCard=store.recipes.map((pair)=>(
            <RecipeCards
                idNamePair={pair}
            />
            ))
        }
    }

    //called when user clicks on the "GENERATE" button
    const handleSubmit=(event)=>{
        store.filterRecipes()
    }


    //called when user clicks on an ingredient checkbox. Checks if the 
    //ingredient is checked or unchecked
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

    //called when user clicks on "RANDOMNIZE" button
    //checks to make sure there are recipes to choose from
    const handleChooseRecipe=(event)=>{
        if(store.filteredRecipes.length>0){
            store.randomlySelectRecipe(store.filteredRecipes.length)
        }
        else{
            alert("No recipes to choose from")
        }
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
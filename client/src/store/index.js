import { createContext, useState } from 'react'
import api from '../api'


export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 

*/

//types of updates to the global data store
export const GlobalStoreActionType = {
    RANDONMIZE_RECIPE: "RANDONMIZE_RECIPE",
    UPDATE_CHECKED_INGREDIENTS: "UPDATE_CHECKED_INGREDIENT",
    GENERATE_RECIPES:"GENERATE_RECIPES",
    INGREDIENTS_LIST:"INGREDIENTS_LIST",
    LOAD_RECIPES:"LOAD_RECIPES",
}



//making global data store available to rest of the application
export const useGlobalStore = () => {
    
    //store states
    const [store, setStore] = useState({
        checkedIngredients:[],
        showModal: false,
        filteredRecipes:[],
        chosenRecipe:null,
        recipes:[]
    });


    //reducers that handle state changes
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.RANDONMIZE_RECIPE:{
                return setStore({
                    checkedIngredients:store.checkedIngredients,
                    showModal: store.showModal,
                    filteredRecipes:store.acceptableRecipe,
                    chosenRecipe:payload,
                    recipes:store.recipes
                })
            }
            case GlobalStoreActionType.UPDATE_CHECKED_INGREDIENT:{
                return setStore({
                    checkedIngredients:payload,
                    showModal: store.showModal,
                    filteredRecipes:store.acceptableRecipe,
                    chosenRecipe:store.chosenRecipe,
                    recipes:store.recipes
                })
            }
            case GlobalStoreActionType.GENERATE_RECIPES:{
                return setStore({
                    checkedIngredients:store.checkedIngredients,
                    showModal:store.showModal,
                    filteredRecipes:payload,
                    chosenRecipe:store.chosenRecipe,
                    recipes:store.recipes
                })
            }
            case GlobalStoreActionType.LOAD_RECIPES:{
                return setStore({
                    checkedIngredients:store.checkedIngredients,
                    showModal:store.showModal,
                    filteredRecipes:store.filteredRecipes,
                    chosenRecipe:store.chosenRecipe,
                    recipes:payload
                })
            }
            default:
                return store;
        }
    }

    //retrieves and loads all the recipes 
    store.loadRecipes=function(){
        async function asyncLoadRecipes(){
            const response=await api.getAllRecipes();
            if(response.data.success){
                let recipe= response.data.data
                storeReducer({
                    type:GlobalStoreActionType.LOAD_RECIPES,
                    payload:recipe
                })
            }
            else{
                console.log("API FAILED TO GET RECIPES")
            }

        }asyncLoadRecipes()
    }



    //update state for when an ingredient is checked
    store.setCheckedIngredients=function(ingredient){
        let currentList=store.checkedIngredients
        currentList.push(ingredient)
    }

    //update state for when an ingredient is unchecked
    store.uncheckIngredients=function(ingredient){
        let currentList=store.checkedIngredients
        for(let i=0;i<currentList.length;i++){
            if(ingredient === currentList[i]){
                currentList.splice(i,1)
            }
        }
    }

    //filter through database for possible recipes and updates the state
    store.filterRecipes=function(){
        store.filteredRecipes=[]

        async function asyncGetRecipes(){
            let response=await api.getAllRecipes()

            let tempList=store.filteredRecipes
            let tempListForCard=[]
        
            if(response.data.success){
                //goes through every retrieved recipes and check
                //for matches
                for(let i=0;i<response.data.data.length;i++){
                    let recipe=response.data.data[i].ingredients
                    let ingre=store.checkedIngredients
                    const match=recipe.every(val=>ingre.includes(val))
                    if(match){
                        tempList.push(response.data.data[i]._id)
                        tempListForCard.push(response.data.data[i])
                    }
                }
                
                //updates state for recipe card
                storeReducer({
                    type:GlobalStoreActionType.LOAD_RECIPES,
                    payload:tempListForCard
                })
                //refreshes the page
                store.history.push("/")

                let size=store.filteredRecipes.length
                console.log("FILTERED RECIPE SIZE:"+size)
                if(size===0){
                    alert("no recipes can be found")
                }
            }
        }asyncGetRecipes()
    }

    //randomly selects a recipe from filtered list 
    store.randomlySelectRecipe=function(size){
        let chosenRecipe=store.filteredRecipes[getRandomInt(size)]
        store.markRecipeForModal(chosenRecipe)
    }

    //random generator from [0-max)
    function getRandomInt(max){
        return Math.floor(Math.random()*max);
    }

    //marks a specific recipe ready to show in modal
    store.markRecipeForModal=function(id){
        async function asyncGetRecipe(id){
            let response= await api.getRecipeById(id)
            if (response.data.success){
                let recipeInfo=response.data.recipe
                storeReducer({
                    type:GlobalStoreActionType.RANDONMIZE_RECIPE,
                    payload:recipeInfo
                })
            }
        }asyncGetRecipe(id)
        store.showRecipeModal()
    }

    //function to make modal visible
    store.showRecipeModal=function(){
        store.showModal=true
        let modal=document.getElementById("recipe-modal");
        modal.classList.add("is-visible")
    }

    //function to make modal invisible
    store.hideRecipeModal=function(){
        let modal=document.getElementById("recipe-modal");
        modal.classList.remove("is-visible");
        console.log("FILTERED RECIPE AFTER CLOSING MODAL")
        console.log(store.filteredRecipes)
        store.showModal=false
    }

    return { store, storeReducer };
}
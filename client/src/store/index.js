import { createContext, useState } from 'react'
import api from '../api'


export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 

*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    RANDONMIZE_RECIPE: "RANDONMIZE_RECIPE",
    UPDATE_CHECKED_INGREDIENTS: "UPDATE_CHECKED_INGREDIENT",
    GENERATE_RECIPES:"GENERATE_RECIPES",
}



// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE

    const [store, setStore] = useState({
        checkedIngredients:[],
        showModal: false,
        filteredRecipes:[],
        chosenRecipe:null,
    });


    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.RANDONMIZE_RECIPE:{
                return setStore({
                    checkedIngredients:store.checkedIngredients,
                    showModal: store.showModal,
                    filteredRecipes:store.acceptableRecipe,
                    chosenRecipe:payload
                })
            }
            case GlobalStoreActionType.UPDATE_CHECKED_INGREDIENT:{
                return setStore({
                    checkedIngredients:payload,
                    showModal: store.showModal,
                    filteredRecipes:store.acceptableRecipe,
                    chosenRecipe:store.chosenRecipe
                })
            }
            case GlobalStoreActionType.GENERATE_RECIPES:{
                return setStore({
                    checkedIngredients:store.checkedIngredients,
                    showModal:store.showModal,
                    filteredRecipes:payload,
                    chosenRecipe:store.chosenRecipe
                })
            }
            default:
                return store;
        }
    }

    //update state for when an ingredient is checked
    store.setCheckedIngredients=function(ingredient){
        let currentList=store.checkedIngredients
        currentList.push(ingredient)
        storeReducer({
            type:GlobalStoreActionType.UPDATE_CHECKED_INGREDIENTS,
            payload:currentList
        })
    }

    //update state for when an ingredient is unchecked
    store.uncheckIngredients=function(ingredient){
        let currentList=store.checkedIngredients
        for(let i=0;i<currentList.length;i++){
            if(ingredient === currentList[i]){
                currentList.splice(i,1)
            }
        }
        storeReducer({
            type:GlobalStoreActionType.UPDATE_CHECKED_INGREDIENT,
            payload:currentList
        })
    }

    //filter through database for possible recipes and updates the state
    store.filterRecipes=function(){
        async function asyncGetRecipes(){
            let response=await api.getAllRecipes()
            let tempList=store.filteredRecipes
            // console.log("TEMP LIST:::")
            // console.log(tempList)
            if(response.data.success){
                for(let i=0;i<response.data.data.length;i++){
                    let recipe=response.data.data[i].ingredients
                    let ingre=store.checkedIngredients
                
                    const match=recipe.every(val=>ingre.includes(val))
                    if(match){
                        tempList.push(response.data.data[i]._id)
                    }
                }
                storeReducer({
                    type:GlobalStoreActionType.GENERATE_RECIPES,
                    payload:tempList
                })

                //checks if there are matching recipes, if not, alerts the user
                let size=store.filteredRecipes.length
                if(size){
                    randomlySelectRecipe(size)
                }
                else{
                    alert("no recipes can be found")
                }
            }
        }asyncGetRecipes()
    }

    //randomly selects a recipe from filtered list 
    function randomlySelectRecipe(size){
        // console.log("# of possible recipe(s):"+size)
        // console.log(store.filteredRecipes)
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
        let emptyList=[]
        storeReducer({
            type:GlobalStoreActionType.GENERATE_RECIPES,
            payload:emptyList
        })
        // console.log("cleared acceptable recipes")
        store.showModal=false
    }






    return { store, storeReducer };
}
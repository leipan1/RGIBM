import { createContext, startTransition, useState } from 'react'
import api from '../api'


export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 

    @author Leipan
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    SET_CHECKED_INGREDIENTS:"SET_CHECKED_INGREDIENTS",
    GENERATE_RECIPE: "GENERATE_RECIPE",
    FIND_RECIPE: "FIND_RECIPE",
}



// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE

    const [store, setStore] = useState({
        checkedIngredients:[],
        generateRecipe: false,
        acceptableRecipe:[],
        chosenRecipe:null,
    });


    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.SET_CHECKED_INGREDIENTS:{
                return setStore({
                    checkedIngredients:payload,
                    generateRecipe: store.generateRecipe,
                    acceptableRecipe:store.acceptableRecipe,
                    chosenRecipe:store.chosenRecipe
                })
            }
            case GlobalStoreActionType.GENERATE_RECIPE:{
                return setStore({
                    checkedIngredients:store.checkedIngredients,
                    generateRecipe: store.generateRecipe,
                    acceptableRecipe:store.acceptableRecipe,
                    chosenRecipe:payload
                })
            }
            case GlobalStoreActionType.ACCETABLE_RECIPE:{
                return setStore({
                    checkedIngredients:store.checkedIngredients,
                    generateRecipe: store.generateRecipe,
                    acceptableRecipe:payload,
                    chosenRecipe:store.chosenRecipe
                })
            }
            default:
                return store;
        }
    }
    store.setCheckedIngredients=function(ingredient){
        store.checkedIngredients.push(ingredient)
        console.log("checked ingredients:"+store.checkedIngredients);

    }

    store.uncheckIngredients=function(ingredient){
        for(let i=0;i<store.checkedIngredients.length;i++){
            if(ingredient === store.checkedIngredients[i]){
                store.checkedIngredients.splice(i,1)
            }
        }
        console.log("checked ingredients:"+store.checkedIngredients);
    }

    store.generateRecipeModal=function(id){
        async function asyncGetRecipe(id){
            let response= await api.getRecipeById(id)
            if (response.data.success){
                let recipeInfo=response.data.recipe
                storeReducer({
                    type:GlobalStoreActionType.GENERATE_RECIPE,
                    payload:recipeInfo
                })
            }
        }asyncGetRecipe(id)
        store.showRecipeModal()
    }

    store.showRecipeModal=function(){
        store.generateRecipe=true
        let modal=document.getElementById("recipe-modal");
        modal.classList.add("is-visible")
    }
    store.hideRecipeModal=function(){
        let modal=document.getElementById("recipe-modal");
        modal.classList.remove("is-visible");
        store.generateRecipe=null
        store.acceptableRecipe=[]
        console.log("cleared acceptable recipes")
        console.log(store.acceptableRecipe)
    }

    store.filterRecipes=function(){
        async function asyncGetRecipes(){
            let response=await api.getAllRecipes()
            if(response.data.success){
                for(let i=0;i<response.data.data.length;i++){
                    let recipe=response.data.data[i].ingredients
                    let ingre=store.checkedIngredients
                
                    const match=recipe.every(val=>ingre.includes(val))
                    if(match){
                        store.acceptableRecipe.push(response.data.data[i]._id)
                    }
                }
            }
            randomlySelectRecipe()
        }asyncGetRecipes()
    }

    function randomlySelectRecipe(){
        let size=store.acceptableRecipe.length
        console.log("# of possible recipe(s):"+store.acceptableRecipe.length)
        if(size){
            //console.log("the random recipe being chosen is:"+ store.acceptableRecipe[getRandomInt(size)])
            let chosenRecipe=store.acceptableRecipe[getRandomInt(size)]
            store.generateRecipeModal(chosenRecipe)
        }
        else{
            alert("no recipes can be found")
        }
    }

    function getRandomInt(max){
        return Math.floor(Math.random()*max);
    }





    return { store, storeReducer };
}
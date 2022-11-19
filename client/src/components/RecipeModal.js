import React, { Component, useContext } from 'react';
import { GlobalStoreContext } from '../store'

function RecipeModal(){
    const {store} = useContext(GlobalStoreContext);
    if(store.generateRecipe){
        console.log("show recipe modal")
    }
}
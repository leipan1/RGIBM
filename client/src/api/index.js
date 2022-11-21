/*
    This is our http api, which we use to send requests to
    our back-end API. Note we're using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it's a Promise-
    based API which helps a lot with asynchronous communication.
 
*/

import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})


//All requests that will be made. 
export const getAllRecipes = () => api.get(`/recipes`)
export const getRecipeById = (id) => api.get(`/recipe/${id}`)

const apis = {
    getAllRecipes,
    getRecipeById,
}

export default apis

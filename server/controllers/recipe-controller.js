const Recipe = require('../models/recipe-model')

createRecipe = (req, res) => {
    const body = req.body;
    console.log("createRecipe body: " + body);
    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Recipe',
        })
    }

    const recipe = new Recipe(body);
    console.log("recipe: " + JSON.stringify(body));
    if (!recipe) {
        return res.status(400).json({ success: false, error: err })
    }

    recipe
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                recipe: recipe,
                message: 'recipe Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'recipe Not Created!',
            })
        })
}

deleteRecipe = async (req,res) =>{
    await Recipe.deleteOne({_id: req.params.id}, (err,list)=>{
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
    
}

getRecipeById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getRecipes = async (req, res) => {
    await Playlist.find({}, (err, recipes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!recipes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Recipes not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getRecipePairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Recipes not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

editRecipe = async (req,res)=>{
    console.log("edit recipe in server called!")
    const body=req.body
    console.log("body:")
    console.log(body)
    await Playlist.updateOne({ _id: req.params.id }, body, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        return res.status(200).json({ success: true, playlist: list });
  }).catch((err) => console.log(err));
}

module.exports = {
    createRecipe,
    deleteRecipe,
    getRecipes,
    getRecipePairs,
    getRecipeById,
    editRecipe,
}
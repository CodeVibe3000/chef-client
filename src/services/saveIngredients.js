import { client } from '../apollo'
import addIngredientsToRecipe from '../graphql/addIngredientsToRecipe'

export default function(id) {
    var ingredients = (document.getElementById("editIngredients").innerText.split('\n'))

    ingredients = ingredients.filter(ing => ing != "")
    
    console.log(id)

    client.mutate({
        mutation: addIngredientsToRecipe,
        variables: {
            id,
            ing: ingredients
        }
    })
}
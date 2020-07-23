import { client } from "../apollo";
import createRecipe from "../graphql/createRecipe";
import addIngredientsToRecipe from '../graphql/addIngredientsToRecipe'
import addInstructionsToRecipe from '../graphql/addInstructionsToRecipe'
import addInstructionsToSection from '../graphql/addInstructionsToSection'
import createSection from '../graphql/createSection'
import gql from "graphql-tag";


export function importIntoRecipe(recipe) {
    var name = recipe.title
    var description = recipe.description
    client.mutate({ mutation:createRecipe, variables:{
        name,
        description,
        public: true
    } }).then(async res => {
        console.log(recipe.ingredients)
        if(typeof recipe.ingredients[0] == "object"){
            await client.mutate({mutation:addIngredientsToRecipe, variables:{
                id:res.data.createRecipe,
                ing: recipe.ingredients[0]
            }})
        }else{
            await client.mutate({mutation:addIngredientsToRecipe, variables:{
                id:res.data.createRecipe,
                ing: recipe.ingredients
            }})
        }
        await client.mutate({mutation:gql`
            mutation($id:Float!, $url: String!) {
                addImgUrl(id:$id, url:$url)
            }
        `, variables:{
            id:res.data.createRecipe,
            url: (recipe.image).replace("https://", "")
        }})
        var instructionsSTR = []
        for(var i of recipe.instructions) {
            if(typeof i == "string"){
                console.log(i)
                instructionsSTR.push(i)
            }else{
                console.log(i.name)
                console.log(i.instructions)
                await client.mutate({mutation:createSection, variables:{
                    name:i.name,
                    id: res.data.createRecipe
                }})
                await client.mutate({mutation:addInstructionsToSection, variables:{
                    name:i.name,
                    id: res.data.createRecipe,
                    instructions: i.instructions
                }})
            }
        }
        if(instructionsSTR.length != 0){
            client.mutate({
                mutation: addInstructionsToRecipe,
                variables: {
                    id: res.data.createRecipe,
                    ins: instructionsSTR
                }
            })
        }
        window.location.pathname = "/edit/"+res.data.createRecipe
    })
}
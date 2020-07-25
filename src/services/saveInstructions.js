import { client } from '../apollo'
import addInstructionsToRecipe from '../graphql/addInstructionsToRecipe'

export default function(id) {
    var instructions = (document.getElementById("editInstructions").innerHTML)

    client.mutate({
        mutation: addInstructionsToRecipe,
        variables: {
            id,
            ins: instructions
        }
    })
}
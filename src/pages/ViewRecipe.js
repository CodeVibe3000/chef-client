import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from "@apollo/react-hooks";

import viewRecipe from '../graphql/viewRecipe'
import { Container } from 'semantic-ui-react';

export default function ViewRecipe() {
    const { id } = useParams()

    const { loading, error, data } = useQuery(viewRecipe, { variables: { id: parseFloat(id) } })

    if (!error && !loading) {

        var recipe = data.getRecipeById

        console.log(recipe)

        return (
            <Container style={{ marginTop: "70px" }}>
                <h1 className="title">{(recipe.name)}</h1><hr></hr>
                <h3 className="des">{recipe.description}</h3><br></br>
                <center>
                    <img src={"http://" + recipe.imgUrl} className="imgView" alt={recipe.description} height="500px" width="500px" id="imgView"></img><br></br>
                </center>
                <div className="recipe">
                    {
                        recipe.ingredients ?
                            recipe.ingredients.map((e, i) => {
                                if (i === 0) {
                                    return (
                                        <>
                                            <h2>Ingredients</h2>
                                            <p className="thing">{e}</p>
                                        </>
                                    )
                                } else {
                                    return (
                                        <p className="thing">{e}</p>
                                    )
                                }
                            }) : null
                    }
                </div>
                <div className="recipe">
                    {
                        recipe.instructions ? <h2>Instructions</h2> : null
                    }
                    {
                        recipe.instructions ?
                            <div>{
                                recipe.instructions.map((e, i) => {
                                    if (i === 0) {
                                        return (
                                            <>
                                                <p className="thing">{e}</p>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <p className="thing">{e}</p>
                                        )
                                    }
                                })}
                            </div> : null
                    }<br></br>
                    {
                        <div>
                            {
                                recipe.sections.map((e, i) => {
                                    return (
                                        <>
                                            <h3>{e.name}</h3>
                                            <div>
                                                {
                                                    e.instructions ?
                                                        e.instructions.map(e => {
                                                            return (
                                                                <p className="thing">{e}</p>
                                                            )
                                                        }) : null
                                                }
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </Container>
        )
    }

    return (
        <p>loading</p>
    )
}
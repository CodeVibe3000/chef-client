import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useQuery } from "@apollo/react-hooks";
import { graphql } from 'react-apollo'
import { Input, Button, Modal } from 'semantic-ui-react'

import viewRecipe from '../graphql/viewRecipe'
import renameRecipe from '../graphql/renameRecipe'

import publishRecipe from '../graphql/publishRecipe'

import { client } from ".././apollo";

import saveIngredients from '../services/saveIngredients.js'

import "../App.css"

class EditRecipeComponent extends React.Component {
    state = {
        name: "",
        description: "",
        ingOpen: false
    }

    componentDidMount() {
        this.setState(this.props.recipe)
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    rename = () => {
        const { name, description, id } = this.state;

        this.props.mutate({ variables: { name, description, id } })
    }

    computeIngredientsHTML = () => {
        if (!this.state.ingredients) {
            return "<p>Enter Ingredients</p>"
        } else {
            var html = ""
            for (var i of this.state.ingredients) {
                html += "<div>" + i + "</div>"
            }
            return html
        }
    }

    //bob

    render() {
        return (
            <div>
                <div className="editbar">
                    <center style={{ marginTop: "50px" }}>
                        <h2>Edit Recipe</h2>
                        <Input value={this.state.name} name="name" onChange={this.onChange}></Input><br></br><br></br>
                        <textarea value={this.state.description} name="description" onChange={this.onChange} rows="5" cols={50} className="tarea"></textarea><br></br><br></br>
                        <Button onClick={() => {
                            this.setState({ ingOpen: true })
                        }}><i class="fas fa-utensils icon"></i> Edit Ingredients</Button>
                        <br></br><br></br>
                        <Button color="blue" fluid onClick={this.rename}>Save</Button>
                    </center>
                </div>
                <div style={{ marginLeft: "480px" }}>
                    <Modal size={'fullscreen'} open={this.state.ingOpen} style={{ marginLeft: "40px" }} onClose={() => {
                        this.setState({ ingOpen: false })
                    }}>
                        <Modal.Header>Edit Ingredients</Modal.Header>
                        <Modal.Content>
                            <div id="editIngredients" className="thingcontainer" contentEditable={true} dangerouslySetInnerHTML={{
                                __html: this.computeIngredientsHTML()
                            }}>
                            </div>
                            <br></br>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                color={"blue"}
                                icon='checkmark'
                                labelPosition='right'
                                content='Save'
                                onClick={() => {
                                    saveIngredients(this.state.id)
                                    this.setState({ ingOpen: false })
                                }}
                            />
                        </Modal.Actions>
                    </Modal>
                    <div className="topnav">
                        <div>
                            {
                                this.state.public && !this.state.published ? (<Button color="blue" onClick={() => {
                                    client.mutate({
                                        mutation: publishRecipe,
                                        variables: {
                                            id: this.state.id
                                        }
                                    })
                                }}>Publish</Button>) : null
                            }
                        </div>
                    </div>
                    <div>
                        <h1 className="title">{(this.state.name)}</h1>
                        <h3 className="des">{this.state.description}</h3><br></br>
                        <center>
                            <img className="imgView" src={"http://" + this.state.imgUrl} alt={this.state.description} height="500px" width="500px"></img><br></br>
                        </center>
                        <div className="recipe">
                            {
                                this.state.ingredients ?
                                    this.state.ingredients.map((e, i) => {
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
                                this.state.instructions ? <h2>Instructions</h2> : null
                            }
                            {
                                this.state.instructions ?
                                    <div className="thingcontainer" dangerouslySetInnerHTML={{__html:
                                        this.state.instructions
                                    }}>
                                    </div> : null
                            }<br></br><br></br>
                            {
                                <div>
                                    {
                                        this.state.sections ?
                                            this.state.sections.map((e, i) => {
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
                                            }) : null
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function EditRecipe({ mutate }) {
    const { id } = useParams()

    const { loading, error, data } = useQuery(viewRecipe, { variables: { id: parseFloat(id) } })
    if (!error && !loading) {
        var recipe = data.getRecipeById

        if (recipe.user.id !== parseInt(localStorage.getItem('uid'))) {
            return <Redirect to={'/dashboard'} />
        } else {
            return (
                <EditRecipeComponent recipe={recipe} mutate={mutate} />
            )
        }
    }

    return (
        <p>loading</p>
    )
}

export default graphql(renameRecipe)(EditRecipe);
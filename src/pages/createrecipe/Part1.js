import React, { Component } from "react";
import { Container, Input, Button, Form, Header, Modal, Icon } from "semantic-ui-react";
import { graphql } from "react-apollo";
import createRecipe from '../../graphql/createRecipe'
import Switch from '../../components/switch/index'
import { importIntoRecipe } from "../../services/import";

class Part1 extends Component {

    constructor() {
        super()
        this.state = {
            value: true
        }
    }



    submit = async () => {
        var name = document.getElementById("name").value
        var description = document.getElementById("description").value
        var isPublic = this.state.value

        var res = await this.props.mutate({
            variables: {
                name,
                description,
                public: isPublic
            }
        })

        this.props.setId(res.data.createRecipe)

        this.props.changePart(2)
    }

    render() {
        return (
            <Container text style={{ marginTop: "80px" }}>
                <Form>
                    <h1>Create Recipe</h1><br></br>
                    <ImportModal /><br></br>
                    <Input id="name" placeholder="Name" fluid /><br></br>
                    <Input id="description" placeholder="Description" fluid /><br></br>
                    <h3>Public</h3>
                    <Switch
                        isOn={this.state.value}
                        onColor="#EF476F"
                        handleToggle={() => this.setState({ value: !this.state.value })}
                    /><br></br>
                    <Button onClick={this.submit}>Next</Button>
                </Form>
            </Container>
        )
    }
}

function getRecipe() {
    console.log(document.getElementById("url").value)
    fetch('https://importrecipe.herokuapp.com/import', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: document.getElementById("url").value
        })
    }).then(res => res.json()).then(data => {
        importIntoRecipe(data)
    })
}

const ImportModal = () => {
    return (
        <Modal trigger={<Button fluid color="google plus">Import</Button>} closeIcon>
            <Header icon='download' content='Import New Recipe' />
            <Modal.Content>
                <Input fluid placeholder="Recipe URL" id="url"></Input>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={getRecipe}>
                    <Icon name='download' /> Import
        </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default graphql(createRecipe)(Part1)
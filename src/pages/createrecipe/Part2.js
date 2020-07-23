import React, { Component } from "react";
import { Container, Input, Button } from "semantic-ui-react";

export default class Part2 extends Component {
    render() {
        return (
            <Container text style={{ marginTop:"80px" }}>
                <form method="POST" enctype="multipart/form-data" action="http://localhost:4000/uploadRecipeImage">
                    <h1>Upload Image</h1>
                    <Input name="recipeId" fluid style={{ visibility:"hidden" }} value={this.props.id} /><br></br>
                    <Input name="image" id="image" type="file" fluid /><br></br>
                    <Button type="submit">Submit</Button>
                </form>
            </Container>
        )
    }
}

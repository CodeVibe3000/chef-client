import React from 'react'
import { Button, Container, Card, Icon } from 'semantic-ui-react'

export default class Display1 extends React.Component {
    render () {
      return (
        <Container>
            {
              this.props.search ? <h2>Search Results for "{document.getElementById('q').value}"</h2> : null
            }
            {
            (this.props.data).map(recipe => {
              return (
                <Card className="recipe-card" style={{ marginRight: "40px" }}>
                  <img src={"http://" + recipe.imgUrl} height="300px" className="imgView" alt="text"></img>
                  <Card.Content>
                    <Card.Header><a href={`/recipe/${recipe.id}`}>{recipe.name}</a></Card.Header>
                    <Card.Meta>
                      <span className='date'>{recipe.user.name}</span>
                    </Card.Meta>
                    <Card.Description>
                      {recipe.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <p style={{ marginRight: "10px" }}>
                      <Icon name='thumbs up' />
                    50 likes
                  </p>
                    <p>
                      <Icon name='eye' />
                    158 views
                  </p>
                  </Card.Content>
                  {
                    recipe.user.id === parseInt(localStorage.getItem("uid")) ? (
                      <Button circular color='twitter' icon='edit' className="edit"  onClick={() => {
                        console.log("Edit recipe "+recipe.id)
                        window.location.pathname = "/edit/"+recipe.id
                      }} />
                    ):(null)
                  }
                </Card>
              )
            })
          }
  
          </Container>
      )
    }
}
import React from 'react'
import { Button, Container, Card, Image, Icon, Feed } from 'semantic-ui-react'

export default class Display1 extends React.Component {
  render() {
    return (
      <Container text>
        <Feed>
          <a href="/create-recipe">
            <Button fluid >Create a New Recipe</Button>
          </a><br></br>

          {
            (this.props.data).map(recipe => {
              console.log(recipe)
              return (
                <div className="feed-recipe">
                  <Feed.Event style={{ marginRight: "40px", width: "50%" }}>
                    <Feed.Content>
                      <Card.Header>
                        <a href={`/recipe/${recipe.id}`}>{recipe.name}</a>                         {
                          recipe.user.id === parseInt(localStorage.getItem("uid")) ? (
                            <Button circular color='twitter' style={{ marginLeft: "2%" }} icon='edit' className="edit" onClick={() => {
                              window.location.pathname = "/edit/" + recipe.id
                              console.log("Edit recipe " + recipe.id)
                            }} />
                          ) : (null)
                        }</Card.Header><br></br>
                      <Feed.Meta>
                        <h4>{recipe.user.name}</h4>
                      </Feed.Meta>
                      <Feed.Summary>
                        <span className="grey">{recipe.description}</span>
                      </Feed.Summary><br></br>
                      <Feed.Extra>
                        <Image src={"http://" + recipe.imgUrl} className="imgView" wrapped />
                      </Feed.Extra><br></br>
                      <Feed.Meta>
                        <Feed.Like className="icon">
                          <Icon name='thumbs up' />
                          41 Likes
                        </Feed.Like>
                        <Feed.Like className="icon">
                          <Icon name='eye' />
                        100 Views
                        </Feed.Like>
                      </Feed.Meta>
                    </Feed.Content>

                  </Feed.Event>
                </div>
              )
            })
          }
        </Feed>
      </Container>
    )
  }
}
import React, { useState } from 'react'
import { Menu, Input, Button } from 'semantic-ui-react'
import Display1 from '../shared/Display1'
import Display2 from '../shared/Display2'
import getRecipesByLimit from '../../graphql/getRecipesByLimit'
import searchRecipes from '../../graphql/searchRecipe'
import { useQuery } from 'react-apollo'
import { client } from '../../apollo'
import "./index.css"

const Dashboard = () => {
  var { loading, error, data } = useQuery(getRecipesByLimit, { variables: { limit: parseFloat(5) } })
  var [display, setDisplay] = useState(1)
  if (!loading && !error) {
    return (
      <div>
        <Menu secondary style={{ backgroundColor: "#ddebea" }}>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input id="q" placeholder='Search...' /><Button icon="search" className="icon" onClick={() => {
                client
                  .query({
                    query: searchRecipes, variables: { q: document.getElementById('q').value }
                  })
                  .then(result => {
                    data.getNewestRecipes = (result.data).searchRecipes
                    setDisplay(display + 1)
                    if(document.getElementById('q').value === ""){
                      setDisplay(1)
                    }
                  });
              }} />
            </Menu.Item>
            <Menu.Item
              name='logout'
              onClick={() => {
                localStorage.clear()
                window.location.pathname = "/"
              }}
            />
          </Menu.Menu>
        </Menu>
        <div className="stuffs">
        {
          display === 1 ? <Display1 data={data.getNewestRecipes} search={true} /> : null
        }{
          display > 1 ? (<Display2 data={data.getNewestRecipes} />): null
        }
        </div>
      </div>
    )
  }
  else {
    return "Loading"
  }
}

export default Dashboard
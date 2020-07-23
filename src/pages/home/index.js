import React from 'react'
import { Menu, Input, Button } from 'semantic-ui-react'
import Display2 from '../shared/Display2'
import { useQuery } from 'react-apollo'
import getMyRecipes from '../../graphql/getMyRecipes'

const Dashboard = () => {
  var { loading, error, data } = useQuery(getMyRecipes)
  if (!loading && !error) {
    return (
      <div>
        <Menu secondary style={{ backgroundColor: "#ddebea" }}>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input id="q" placeholder='Search...' /><Button icon="search" className="icon" onClick={() => {
                
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
          <Display2 data={data.getMyRecipes}/>
        </div>
      </div>
    )
  }
  else {
      console.log(loading, error)
    return "Loading"
  }
}

export default Dashboard
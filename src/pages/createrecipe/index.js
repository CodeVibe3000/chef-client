import React, { Component } from 'react'
import Part1 from './Part1'
import Part2 from './Part2'

export default class index extends Component {
    constructor() {
        super()
        this.state = {
            part:1,
            id: 0
        }
    }

    changePart = (part) => {
        this.setState({ part })
    }

    setId = (id) => {
        this.setState({ id })
    }

    render() {
        if(this.state.part === 1){
            return <Part1 changePart={this.changePart} setId={this.setId}/>
        }
        else if(this.state.part === 2){
            return <Part2 id={this.state.id} />
        }else{
            return <p>hi</p>
        }
    }
}

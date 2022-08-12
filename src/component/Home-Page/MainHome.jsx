import React, { Component } from 'react'
import { Filters } from './Filters'
 
import Headers from './Header'
import Products from './Products'

 
export default class MainHome extends Component {
    render() {
        return (
             <>
              <Headers/>
              <Filters/>
             
             </>
        )
    }
}

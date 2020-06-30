import React, { Component } from 'react';
import Reactbase from './components/ReactBase'
class App extends Component { 
    constructor() { 
        super();
        this.state = {
            
        }
    }
    render() {
        return (
            <div id="app">
                {/* 基础用法  radio 与生命周期未解决 */}
                <Reactbase /> 
            </div>
        )
    }
}

export default App
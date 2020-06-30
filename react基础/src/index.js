import React from 'react'
import ReactDom from 'react-dom'

import App from './app.js'
ReactDom.render(
    <App></App>,
    document.querySelector('#root'),
    () => { 
        console.log('渲染完成了...');  
    }
)
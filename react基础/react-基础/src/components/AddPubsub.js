import React, { Component } from 'react';
import PubSub from 'pubsub-js'
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value:''
        }
    }
    render() { 
        return ( 
            <div>
                <h1>添加组件 pubsub</h1> 
                <input type="text" value={this.state.value} onChange={this.onText} />
                <button onClick={this.onBtn}>添加</button>
            </div>
         );
    }
    onText = (ev) => { 
        this.setState({
            value:ev.target.value
        })
    }
    onBtn = () => { 
        // 向父组件发送事件
        PubSub.publish('onAdd',{
            id: new Date().getTime(),
            value: this.state.value
        })
        this.setState({
            value:''
        })
    }
}

export default Add
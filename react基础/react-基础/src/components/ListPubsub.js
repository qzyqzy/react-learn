import React, { Component } from 'react';
import PubSub from 'pubsub-js'
class List extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[]
        }
    }
    render() { 
        return ( 
            <div>
                <h1>列表组件</h1> 
                <ul>
                    {
                        this.state.data.map(({ id, value }) => {
                            return <li key={id}>{value}</li>
                        })
                    }
                </ul>
            </div>
         );
    }
    componentDidMount() { 
        // 监听事件
        this.token = PubSub.subscribe('onAdd', (msg, value) => { 
            this.setState({
                data:[...this.state.data, value ]
            })
        })
    }
    componentWillUnmount() { 
        // 移除事件监听
       PubSub.unsubscribe(this.token);
    }
    onText = (ev) => { 
        this.setState({
            value:ev.target.value
        })
    }
}
export default List
import React, { Component } from 'react';
import PropTypes from 'prop-types'
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
                <h1>添加组件状态提升</h1> 
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
        this.props.onAdd({
            id: new Date().getTime(),
            value: this.state.value
        })
        this.setState({
            value:''
        })
    }
}

// props类型检查
Add.propTypes = {
    // 类型为函数且必须定义
    onAdd: PropTypes.func.isRequired
}

export default Add
import React, { Component } from 'react';
import PropTypes from 'prop-types';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value:''
        }
    }
    render() { 
        return ( 
            <div>
                <h1>列表组件</h1> 
                <ul>
                    {
                        this.props.data.map(({ id, value }) => {
                            return <li key={id}>{value}</li>
                        })
                    }
                </ul>
            </div>
         );
    }
    onText = (ev) => { 
        this.setState({
            value:ev.target.value
        })
    }
}
// props类型检查
List.propTypes = {
    // 类型为函数且必须定义
    data: PropTypes.array
}
export default List
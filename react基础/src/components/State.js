import React, { Component } from 'react';

class State extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: 'hello',
            arr: [1, 2, 3],
            count: 0,
            obj: {
                a:10
            },
            stateCount:0
            
         }
    }
    render() { 
        return ( 
            <div>
                <h1>{ this.state.title }</h1>
                <button onClick={this.onTitle}>改变title的值为hi</button>
                <p>count的值为{this.state.count}</p>
                <button onClick={this.onCount}>count加1</button>
                <p>{this.state.arr}</p>
                <button onClick={this.onAdd}>数组随机新增一个数字</button>
                <button onClick={this.onDelete}>数组删除第一位</button>
                <button onClick={this.onUpdate}>数组修改第一位</button>
                <p>{Object.entries(this.state.obj)}</p>
                <button onClick={this.onObj}>对象修改</button>
                <h2>setState 异步与同步相关</h2>
                <p>数字是{this.state.stateCount}</p>
                <button onClick={this.onSetState}>异步修改</button>
                <button onClick={this.onSetState1}>异步修改 setTimeout</button>
                <button onClick={this.onSetState2}>异步修改 回调函数中获取</button>
                <button onClick={this.onSetState3}>多次异步修改 会被合并</button>
                <button onClick={this.onSetState4}>多次异步修改 不合并</button>
            </div>
         );
    }
    onTitle = () => { 
        this.setState({
            title:'hi'
        })
    }
    onCount = () => { 
        // state中的值不允许直接修改 所以不能这样写
        // count: ++this.state.count  ==> this.state.count = this.state.count + 1
        this.setState({
            count: this.state.count + 1
        })
    }
    onAdd = () => { 
        let value=parseInt(Math.random() * 10)
        this.setState({
            arr: [...this.state.arr, value],
            // or
            // arr: this.state.arr.concat(value)
        })
    }
    onDelete = () => { 
        this.setState({
            arr: this.state.arr.filter((item, index) => index !== 0)
        })
    }
    onUpdate = () => { 
        this.setState({
            arr: this.state.arr.map((item, index) => { 
                if (index === 0) { 
                    return '修改'
                }
                return item
            })
        })
    }
    onObj = () => { 
        this.setState({
            obj: {
                ...this.state.obj,
                a: 20
            },
            // or
            // obj: Object.assign({}, { a: 30 })
        })
    }
    onSetState = () => { 
        // 直接调用修改直接获取的是未修改的值
        // 异步
        this.setState({
            stateCount: this.state.stateCount + 1
        })
        console.log('此时的值为' + this.state.stateCount);
    }
    onSetState1 = () => { 
        // 放入异步任务中此时修改的为同步
        setTimeout(() => { 
            this.setState({
                stateCount: this.state.stateCount + 1
            })
            console.log('此时的值为' + this.state.stateCount);
        }, 0)
    }
    onSetState2 = () => { 
        // 回调函数中获取异步数据
        this.setState({
            stateCount: this.state.stateCount + 1
        }, () => {
            console.log('此时的值为' + this.state.stateCount);
        })
    }
    onSetState3 = () => { 
        // 多次异步会被合并
        this.setState({
            stateCount: this.state.stateCount + 1
        }, () => {
            console.log('此时a的值为' + this.state.stateCount);
        })
        this.setState({
            stateCount: this.state.stateCount + 1
        }, () => {
            console.log('此时b的值为' + this.state.stateCount);
        })
        this.setState({
            stateCount: this.state.stateCount + 1
        }, () => {
            console.log('此时c的值为' + this.state.stateCount);
        })
    }
    onSetState4 = () => { 
        // 多次异步不合并
        this.setState((preState,props) => { 
            return {
                stateCount: preState.stateCount + 1
            }
        }, () => {
            console.log('此时a的值为' + this.state.stateCount);
        })
        this.setState((preState,props) => { 
            return {
                stateCount: preState.stateCount + 1
            }
        }, () => {
            console.log('此时a的值为' + this.state.stateCount);
        })
        this.setState((preState,props) => { 
            return {
                stateCount: preState.stateCount + 1
            }
        }, () => {
            console.log('此时a的值为' + this.state.stateCount);
        })
    }
}
 
export default State;
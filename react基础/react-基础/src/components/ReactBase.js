import React, { Component } from 'react';
import Child from './../child'
import Add from './Add'
import List from './List'
import AddVue from './AddVue'
import ListVue from './ListVue'
import AddVuePubsub from './AddPubsub'
import ListVuePubsub from './ListPubsub'
import State from './State'
class ReactBase extends Component { 
    constructor(props) { 
        super(props);
        this.state={
            userName: 'qzy',
            sex: '男',
            checkBoxStatus: true,
            eventBusStatus:true,
            birth: '',
            addList:[]
        }
    }
    render() {
        let msg = 'app组件'
        let classStatus = false
        let htmlStr = '<b>加粗的富文本</b>'
        let childStatus = true
        let arrData = [1, 2, 3]
        let objData = {
            name: 'qzy',
            age: 18
        }
        return (
            <div id="app">
                <h1>hello,qzy</h1>
                <div>{msg}</div>
                <div>{msg.split('').reverse().join('')}</div>
                <div className="app">className 因为class为关键字  其他所有均使用小驼峰命名</div>
                <div className={`box${classStatus ? ' box-active' : ''}`}>绑定class</div>
                <div style={{ width: '100%', height: '50px', backgroundColor: 'red',lineHeight:'50px',color:'#fff' }}>绑定style</div>
                <div dangerouslySetInnerHTML={{__html:htmlStr}}></div>
                <Child />
                {/* 条件渲染 */}
                {childStatus && <Child />}
                {childStatus || <div> 条件为假时渲染 </div>}
                {/* 列表循环 */}
                <div>
                    <ul>
                        {arrData.map((item, index) => <li key={item}>{`下标为：${index}、值为：${item}`}</li> )}
                    </ul>
                </div>
                {/* 对象循环 */}
                <div>
                    <ul>
                    {
                        (() => { 
                            let arrData = []
                            for (const key in objData) {
                                if (objData.hasOwnProperty(key)) {
                                    arrData.push(<li key={key}>{`key为：${key}、value为：${objData[key]}`}</li>)
                                }
                            }
                            return arrData
                        })()
                        }
                        {
                            Object.entries(objData).map(([key,value], index) => <li key={key}>{`下标为：${index}、key为：${key}、value为：${value}`}</li> )
                        }
                    </ul>
                </div>
                {/* 事件 */}
                <div>
                    <button onClick={this.onBtn}>点击事件-默认</button>
                    <button onClick={this.onBtnBind.bind(this)}>点击事件-绑定this</button>
                    <button onClick={this.onBtnArrow}>点击事件-箭头函数</button>
                    <button onClick={() => { console.log('行内点击事件执行...',this)}}>点击事件-行内</button>
                </div>
                {/* 事件传参 */}
                <div>
                    <button onClick={this.onBtnBindArg.bind(this, 1, 2, 3)}>bind事件传参</button>
                    <button onClick={this.onBtnArrowArg(1,2,3)}>箭头函数事件传参</button>
                </div>
                {/* 受控组件 */}
                <div>
                    <div>
                            input: <input type="text" value={this.state.userName} onChange={this.onInputChange}/>   <br/>
                            textarea: <textarea value={this.state.userName} onChange={this.onInputChange}></textarea><br/>
                            <button>{this.state.userName}</button>
                    </div> 
                    <div>
                        {/* todo  */}
                        {/* radio获取的值一直不对 */}
                        <input name="123" type="radio" vlaue='男' checked={this.state.sex==='男'} onChange={this.onRadio} /> 男
                        <input name="123" type="radio" vlaue='女' checked={this.state.sex==='女'} onChange={this.onRadio} /> 女
                   </div>
                    <div>
                        {this.state.checkBoxStatus?'选择':'未选择'}<input type="checkbox" checked={this.state.checkBoxStatus} onChange={this.onCheck} />
                    </div>
                    <div>
                        <p>生日：{this.state.birth}</p>
                        <select value={this.state.birth} onChange={this.onSelect} >
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                        </select>
                    </div>
                </div>
                {/* 状态提升 子组件将事件发送到父组件 父组件中交互 */}
                <div>
                    <Add onAdd={this.onAdd}/>
                    <List data={this.state.addList}/>
                </div>
                {/* 组件互相通信 借助vue */}
                 <div>
                    <AddVue />
                    <ListVue />
                </div>
                <div>
                    <h3>不移除EventBus监听事件举例</h3>
                    <button onClick={() => {
                        this.setState({
                        eventBusStatus:!this.state.eventBusStatus
                    })}}>点击</button>
                    <AddVue />
                    {this.state.eventBusStatus && <ListVue />}
                </div>
                <div>
                    <AddVuePubsub />
                    <ListVuePubsub />
                </div>
                <div>
                    <State />
                </div>
            </div>
        )
    }
    onBtn(val,ev){ 
        console.log('点击事件执行...',this,val,ev);  
    }
    onBtnBind() { 
        console.log('Bind点击事件执行...',this);  
    }
    onBtnArrow = () => { 
         console.log('Arrow点击事件执行...',this);  
    }
    onBtnBindArg(...arg) { 
        console.log(arg);   
    }
    // 再返回一个函数 因为上面的调用执行了函数
    onBtnArrowArg = (...val) => (ev) => {
        console.log([val, ev]);
    }
    onInputChange = (ev) => { 
        this.setState({
            userName: ev.target.value
        })
    }
    onRadio = (ev) => {    
        const value=ev.target.value
        this.setState({
            sex: value
        })
    }
    onCheck = (ev) => { 
        this.setState({
            checkBoxStatus: !this.state.checkBoxStatus
        })
    }
    onSelect = (ev) => { 
        this.setState({
            birth:ev.target.value
        })
    }
    onAdd = (value) => { 
        this.setState({
            addList:[...this.state.addList,value]
        })
    }
}

export default ReactBase
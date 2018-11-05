import React, { Component } from 'react';
import { ReactComponent as SvgCheck } from './svg/check.svg';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state={
      items: [],
      value: '',
    };
  }
  handleChangeInput = e => {
    this.setState({
      value: e.target.value,
    });
  }
  addItem = e => {
    e.preventDefault()
    if (this.state.value !== '') { 
      this.setState(state => ({
        items: state.items.concat({id: new Date().getTime(),value:this.state.value, done:false}),
        value: '',
      }));
    }
  }
  render() {
    return(
      <div className="shadow-lg mx-auto" style={{ maxWidth: 500 }}>
          <form onSubmit={this.addItem}> 
            <div className="relative border border-solid">
              <SvgCheck 
                onClick={() => {
                  this.setState(state => {
                    const isChecked = state.items.every(i => i.done)
                    return {
                      items: state.items.map(i => {
                        return {...i, done: !isChecked}
                      })
                    }
                  })
                }}
                className="absolute h-full w-16 px-4 focus:outline-none" 
              />
              <input
                type="text"
                placeholder="What needs to be done?"
                className="block w-full text-xl pl-16 pr-4 py-4 text-grey-dark"
                onChange={this.handleChangeInput}
                value={this.state.value}
              />
            </div>
            <ul className="list-reset">
              {(this.state.items || []).map((item, index) => (
                <li 
                  key={index}
                  className="flex border border-solid"
                >
                  <SvgCheck 
                    className="flex-none h-12 w-16 px-4 focus:outline-none"
                    onClick={()=>this.setState(state => ({
                      items: state.items.map(i => {
                        if (i.id === item.id) {
                          return {...i, done: !i.done}
                        }
                        return i
                      })
                    }))}
                  />
                  <span 
                    className={`flex-auto block pr-4 py-3 text-grey-dark 
                                ${item.done ? 'line-through text-grey-light' : 'none'} text-xl`
                              }
                  >
                    {item.value}
                  </span>
                  <button 
                    onClick={() => {
                      this.setState(state => {
                        const removeItem = state.items.filter(i => i.id !== item.id)
                        return {
                          items: removeItem
                        }
                      })
                    }}
                    type="button"
                    className="pr-5 focus:outline-none"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </form>
      </div>
    );
  }
}

export default TodoList

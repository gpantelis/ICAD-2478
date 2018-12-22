import React, { Component } from 'react';
import { DatePicker } from 'antd';
import BaseRouter from './container/routes'

import {BrowserRouter as Router} from 'react-router-dom'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

import CustomLayout from './container/Layout'; 
import PostListView from './container/PostListView';

class App extends Component{
  render(){
    return(
      <div className='App'>
        <Router>
          <CustomLayout> 
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
      );
  }
}






















/*
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list:null,
      isToggleOn:true,
      searchTerm:'',

    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange= this.onSearchChange.bind(this);
 }

onDismiss(id) {
  fetch(`/api/users/${id}`, {method: "DELETE"})
    .then(response => {
      const updatedList = this.state.list.filter(item => item.id !== id);
      this.setState({ list: updatedList });
    })
    .catch(error => error);
}

  onSearchChange(event){
    this.setState({searchTerm:event.target.value});
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(result =>  this.setState({list: result}))
      .catch(error => error);
  }


  render() {

    if(!this.state.list) {return null;}
    return(
      <div className="App">

        <Search 
          value={this.searchTerm}
          onSearchChange={this.onSearchChange}
        />
        <ItemList
          list={this.state.list}
          searchTerm={this.state.searchTerm}
          onDismiss={this.onDismiss}
        />
        <Movie title = "Avatar" genre="action"/>
        <Movie title = "Titanic" genre="drama"/>
        <Movie title = "StarWars" genre="action"/>
        <Board/>
      </div>
      );
  }
}
/*//*/
class Search extends Component{
  render() {
    const {searchTerm, onSearchChange} = this.props;
    return(
      <div className="Search">
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </form>
      </div>
      );
  }
}
*/
class ItemList extends Component {

  searchItem(item) {
    return item.username.toLowerCase()
    .includes(this.props.searchTerm.toLowerCase());
  }

  render() {
    return(
    <div className="users">
      {this.props.list.filter(item => this.searchItem(item)).map(item => 
        
           
            <ul key={item.id}>
            
                  <li>{item.id}</li>
                  <li>{item.username}</li>
                  <li>{item.password}</li>
                  <li>{item.department}</li>                
                        <button className = "delete" onClick={()=>this.props.onDismiss(item.id)}>
            Delete user
            </button> 
            </ul>
         
        
      )}
    </div>
      );
  }
}
/*//*/
class Movie extends Component{
  render(){
    return (
      <div>
      <h1>{this.props.title}</h1>
      <h2>{this.props.genre}</h2>
       
      </div>
      );
  }
}
/*//*/

class Comment extends Component {
    constructor(props) {
    super(props);

    this.state = {
      editing:false,
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
 }

  edit(){
    this.setState({editing:true});    
  }
  remove(){
    this.props.deleteFromBoard(this.props.index); 
 }
  save(){ 
    this.props.updateCommentText(this.refs.newText.value,this.props.index);
    this.setState({editing:false});
  }

    renderForm(){
      return(
          <div>
          <textarea ref="newText" defaultValue={this.props.children}></textarea>

          <button type="button" className="btn btn-success" onClick={this.save}>Save</button>        

          </div>
          );
    }
    
    renderNormal(){
      return(
          <div className="commentContainer">
            <div>{this.props.children}</div>

            <button  type="button" className="btn btn-info" onClick={this.edit}>Edit</button>
            <button type="button" className="btn btn-danger" onClick={this.remove} >Remove</button>
          </div>

        );

    }
    render(){
      if(this.state.editing){
        return this.renderForm();
      } else{
        return this.renderNormal();
      }
    }

}
//**/
class Board extends Component{
  constructor(props) {
    super(props);

    this.state = {
      comments:[],
    }
    
    this.eachComments = this.eachComments.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.updateComment = this.updateComment.bind(this);   
    this.add = this.add.bind(this);  
  }

  add(text){
    var arr = this.state.comments;
    arr.push(text)
    this.setState({comments:arr})
  }
  removeComment(index){
    
    var arr = this.state.comments;
    arr.splice(index,1);
    this.setState({comments:arr});
  }

  updateComment(newText,i){
    
    var arr = this.state.comments;
    arr[i] = newText;
    this.setState({comments:arr});

  }
  eachComments(item,i){
        return(
          <Comment key={i} index={i} updateCommentText={this.updateComment} deleteFromBoard={this.removeComment}>
            {item}
          </Comment>
          );
  }
    render(){
      return(
      <div>
      <button type="button" className="btn btn-primary" onClick={this.add.bind(null,'default text')}> Add New </button>
        <div>
            {this.state.comments.map(this.eachComments)}
        </div>
      </div>
      );
    }

 }



export default App;

import React, {Component} from 'react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import * as actions from '../actions/getPostsActions';
import Commend from '../components/comment'


class CommentList extends Component {

    componentWillMount() {
        
          this.props.actions.loadComments();
        
      }
     
    render() {

        return (
        <div>
          <Commend  />
        </div>

        );
    }
}


function mapStateToProps(state) {
  console.log('state in post-listtttttttttt: ',state)
    if (!state.postOneReducer) {
      return {
        comment: state.commentReducer,
       // id : state.postOneReducer.id
      };
    } else {
      return { 
        comment : null
        /*posts: [{
            "id": '',
            "title": '',
            "text": '',
            "post_date": null,
            "user": null
        }]*/
      }
    }
  }

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(CommentList);
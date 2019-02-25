import React, {Component} from 'react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import * as actions from '../actions/getPostsActions';
import Posts from '../components/post'


class PostList extends Component {

    componentWillMount() {
        if (this.props.posts[0].id === '') {
          this.props.actions.loadPosts('ti leei');
        }
      }
     
    render() {

        return (
        <div>
          <h4>Τελευταίες Αναρτήσεις</h4>
          <br/>
          <Posts data={this.props.posts} posts={this.props.posts}/>
        </div>

        );
    }
}


function mapStateToProps(state) {
  console.log('state in post-list: ',state)
    if (state.postsReducer.length > 0) {
      return {
        posts: state.postsReducer
      };
    } else {
      return {
        posts: [{
            "id": '',
            "title": '',
            "text": '',
            "post_date": null,
            "user": null
        }]
      }
    }
  }

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
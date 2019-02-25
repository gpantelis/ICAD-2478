import React from 'react';
import {connect} from 'react-redux';


class PostDetail extends React.Component {
    render(){
        if(!this.props.activePost){
            return (<h1>NO POST</h1>)
        }
        return (
            <div>
                exoume to post me titlo {this.props.activePost.title}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        activePost:state.postOneReducer.activePost
    }
   
}

export default connect(mapStateToProps,null)(PostDetail);
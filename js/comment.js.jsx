/** @jsx React.DOM */

var Comment = React.createClass({
  getInitialState: function(){
    return {"user_likes" : this.props.user_likes}
  },

  render: function(){
    comment = this.props.comment
    commentStyle = { backgroundColor : '#f5f5f5' }
    comment = (typeof comment == "undefined") ? {} : comment

    if(typeof comment.users_who_commented == "undefined")
      comment.users_who_commented = {}

    formatted_date = moment.utc(comment.comment_date).format("MMMM Do [at] h:mm a")
    console.log(formatted_date)

    profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"

    likes = ""
    if(this.state.user_likes.length > 0)
      likes = <span><i className="fa fa-thumbs-up"/>{" "+comment.user_likes.length}</span>
    
    return (
        <li className="list-group-item" style={commentStyle}>
          <div className="media" >
            <a href="#" style={{padding:'0',width:'34px',marginBottom:'0',marginTop:'2px'}} 
              className="pull-left thumbnail">
              <img src={profile_pic} className="media-object" style={{borderRadius:'2px'}}/>
            </a>
          <div className="media-body">
            <h5 className="media-heading" style={{display:'inline',fontSize:'12px'}}>
                <a href="#">{comment.comment_author_id}</a>
            </h5>
    <span style={{marginLeft:'10px',fontSize:'12px'}}>{comment.comment_body} </span>
              <br/>
              <span style={{fontSize:'12px'}}><span className="text-muted" >
              {formatted_date}
              </span>&nbsp;&nbsp;
              <a href="#" onClick={this.commentLike} id="commentLike">Like</a>
              &nbsp; &nbsp;
              <a href="#" style={{textDecoration:'none'}} onClick={this.showUserLikes}>{likes}</a>
              </span>
            </div>
          </div>
        </li>
    );
  },

  showUserLikes: function(e) {
    e.preventDefault()
  },

  commentLike: function(e){
    e.preventDefault()
    console.log($(this.getDOMNode()).find('#commentLike').text())

    user_likes = this.state.user_likes
    text = $(this.getDOMNode()).find('#commentLike').text()
    if( text == 'Like') {
      $(this.getDOMNode()).find('#commentLike').text('Unlike')
      user_likes.push({})
      this.setState({user_likes : user_likes})
    } else {
      $(this.getDOMNode()).find('#commentLike').text('Like')
      user_likes.pop()
      this.setState({user_likes : user_likes})
    }


    
    //this.props.commentLike(this.props.key)
  }
});

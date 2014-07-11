/** @jsx React.DOM */

var FacebookPost = React.createClass({
  getInitialState: function(){
    var postKeys = [], commentKeys = [];
    p = this.props.post

    comments = (typeof p.comments == "undefined") ? [] : p.comments
    u = (typeof p.users_who_commented == "undefined") ? [] : p.users_who_commented

    return {comments: comments, users: u }
  },

  addComment: function(utc_tstamp, body){
    var comments = this.state.comments.data, users = this.state.users;

    new_comment = {
      comment_author_id : "Test Test",
      comment_body : body,
      comment_date : utc_tstamp,
      likes_link: "no_likes",
      objectId: this.makeid(),
      user_likes: []
    }

    new_user = { }
    comments.push(new_comment); users.push(new_user);
    this.setState({comments: comments, users: users})
  },

  commentLike: function(key){
    console.log(key)
    comments = this.state.comments
    for(i=0;i<comments.length;i++)
      if(comments[i].objectId == key)
        comments[i].user_likes.push({})
        
    this.setState({comments: comments})
    // add user can only like something once logic
    // if liked add unlike
  },

  postComment: function(){
    input = $(this.getDOMNode()).find('textarea').focus()
  },

  postLike: function(e){
    console.log('post like')
    // get the key of specific post and modify user_likes
  },


  render: function(){
    post = this.props.post
    comment = { backgroundColor : '#f5f5f5' }
    show_likes = ""

    /*
    if(post.user_likes.length > 0)
      show_likes = <LikesAndSeens likes = {post.user_likes} />
    */

    comments = []
    if(typeof post.comments != "undefined")
      for(i=0;i<post.comments.data.length;i++){
        comments.push(<Comment comment={post.comments.data[i]} 
                               commentLike={this.commentLike}
                               users={this.state.users[i]}/>)
      }
    /* Display On Web Comments
          {show_likes}
          <CreateComment addComment={this.addComment}/>
        <div className="panel-footer">
          <a href="#" className="btn btn-primary" style={{width:'48%'}}><i className="fa fa-thumbs-up" />&nbsp;Like</a>
          <a href="#" className="btn btn-primary" style={{width:'50%',float:'right'}}><i className="fa fa-comment" />&nbsp;Comment</a>
        </div>
    */

    profile_pic = localStorage.getItem(post.from.id)
    return (
      <div>
        <div className="panel panel-default">
          <PostAuthor date={moment(post.created_time).format("MMMM Do [at] h:mm a")} 
                      author={post.from.name} 
                      pic={profile_pic}/>
          <PostBody body={post.message} 
                    image={this.props.fb_profile_pic} 
                    postComment={this.postComment}
                    postLike={this.postLike}/>
          <ul className="list-group">
            {comments}
            {show_likes}
            <CreateComment addComment={this.addComment}/>
          </ul>
        </div>
      </div>
    );
  },
  componentDidMount: function(){
    
  }

});

var Comment = React.createClass({
  render: function(){
    comment = this.props.comment
    commentStyle = { backgroundColor : '#f5f5f5' }
    if(typeof comment == "undefined")
      comment = {}

    if(typeof comment.users_who_commented == "undefined")
      comment.users_who_commented = {}

    formatted_date = moment.unix(comment.comment_date).format("MMMM Do [at] h:mm a")
    profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"

    
    likes = ""
    if(comment.user_likes.length > 0)
      likes = <span><i className="fa fa-thumbs-up"/>{" "+comment.user_likes.length}</span>
    
    //console.log(comment)
    return (
        <li className="list-group-item" style={commentStyle}>
          <div className="media" >
            <a href="#" style={{padding:'0',width:'34px',marginBottom:'0',marginTop:'2px'}} 
              className="pull-left thumbnail">
              <img src={profile_pic} className="media-object" style={{borderRadius:'2px'}}/>
            </a>
            <div className="media-body">
              <h5 className="media-heading" style={{display:'inline',fontSize:'12px'}}>
                <a href="#">{comment.from.name}</a>
              </h5>
      <span style={{marginLeft:'10px',fontSize:'12px'}}>{comment.message} </span>
              <br/>
              <span style={{fontSize:'12px'}}><span className="text-muted" >
              {moment(comment.created_time).format("MMMM Do [at] h:mm a")}
              </span>&nbsp;&nbsp;
              <a href="#" onClick={this.commentLike}>Like</a>
              &nbsp; &nbsp;
              <a href="#" style={{textDecoration:'none'}}>{likes}</a>
              </span>
            </div>
          </div>
        </li>
    );
  },


  commentLike: function(e){
    e.preventDefault()
    this.props.commentLike(this.props.key)
  }
});

var PostAuthor = React.createClass({
  render: function(){
    author = this.props.author
    if(typeof author == "undefined")
      author = {}

    profile_pic = this.props.pic
    console.log(typeof profile_pic)
    if(typeof profile_pic == "undefined")
      profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"

    profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"

    return (
        <div className="panel-heading" style={{backgroundColor:'white',border:'0'}}>
          <div className="media" style={{height:'45px'}}>
            <a href="#" style={{padding:'0',width:'45px'}} className="pull-left thumbnail">
              <img src={profile_pic} className="media-object"/>
            </a>
            <div className="media-body">
              <h5 className="media-heading" style={{display:'inline'}}>
              <a href="#">{author}</a>
              </h5>
              <br/>
              <span className="text-muted" style={{fontSize:'12px'}}>{this.props.date}</span>
            </div>
          </div>
        </div>
    );
  }
});

var PostBody = React.createClass({
  render: function(){
    image = this.props.image

  /*
    if(image.length == 0)
      the_image = ""
    else
      the_image = <img src={image[0]} style={{width:'100%'}}className="thumbnail" />
  */

  /*
   *
        <a href="#" style={{fontSize:'12px'}} onClick={this.postLike}>Like</a>
        &nbsp;
        &nbsp;
        <a href="#" style={{fontSize:'12px'}} onClick={this.postComment}>Comment</a>
  */
    return (
        <div className="panel-body" style={{paddingBottom:'10px'}}>
        <a href="http://www.facebook.com" style={{textDecoration:'none',color:'black'}}>{this.props.body}</a>
        <div style={{paddingTop:'10px'}}>
        <a href="#" style={{fontSize:'12px'}} onClick={this.postLike}>Like</a>
        &nbsp;
        &nbsp;
        <a href="#" style={{fontSize:'12px'}} onClick={this.postComment}>Comment</a>
        </div>
        </div>
    );
  },

  postComment: function(e) {
    e.preventDefault()
    this.props.postComment()
  },

  postLike: function(e) {
    e.preventDefault()
    this.props.postLike()
  }
});

var LikesAndSeens = React.createClass({
  render: function(){
    likes = this.props.likes
    if(typeof likes == "undefined")
      likes = []
    return (
      <div>
        <li className="list-group-item" style={comment}>
          <h6 style={{display:'inline'}}> <a href="#" style={{fontSize:'13px'}}>
          <i className="fa fa-thumbs-up text-primary" />&nbsp; {likes.length} people</a>&nbsp; <span>like this.</span> </h6>

          <div style={{float:'right',display:'none'}}> <h6 style={{display:'inline'}}><a href="#" >
          <i className="fa fa-check text-primary" /> &nbsp; Seen by 29</a></h6>
          </div>
        </li>
      </div>
    );
  }
});

var CommentOne = React.createClass({
  render: function(){
    return (
      <div>
      </div>
    )
  }
});


var CreateComment = React.createClass({
  componentDidMount: function(){
    $(this.getDOMNode()).find('textarea').autosize()
  },

  keyPress: function(e){
    if(e.keyCode == 13) {
      e.preventDefault()
      body = $(this.getDOMNode()).find('textarea').val()
      this.props.addComment(Date.now(), body)
    }
  },

  render: function(){
    commentStyle = { backgroundColor : '#f5f5f5' }
    return (
        <li className="list-group-item" style={commentStyle}>
          <div className="media" >
            <a href="#" style={{marginBottom:'0px',padding:'0',width:'34px'}} className="pull-left thumbnail">
              <img src="https://pbs.twimg.com/profile_images/2103629538/twit.png" className="media-object" style={{borderRadius:'2px'}}/>
            </a>
            <div className="media-body" style={comment}>
              <form onSubmit={this.createComment}>
                <textarea type="text" className="form-control" 
                  onKeyPress={this.keyPress}
                  placeholder="Write a comment..."
                  rows="1"
                  style={{resize:'none'}} />
              </form>
            </div>
          </div>
        </li>
    );
  }
});


var NewSignup = React.createClass({
  render: function(){
    bg = {
      'background-image': 'linear-gradient(#1f2c65,#85bbcd)',
      'color': '#d6e2e9',
      'height': '110%',
      'marginTop':'-20px',
    }
    loginBtn = {
      'background': 'rgba(255,255,255,0.5)',
      'border': '0',
      'borderRadius': '3px',
      'display':'block',
      'marginRight':'auto',
      'marginLeft':'auto',
      'width': '75%'
    }
    return (
      <div style={bg}>
        <br/>
        <br/>
        <h1 style={{fontWeight:'800',textAlign:'center'}}className="pull-center">
          <i className="fa fa-home" />&nbsp; Nextdoor
        </h1>
        <br/> 
        <h5 style={{fontWeight:'300',fontSize:'16px',marginTop:'0px',textAlign:'center'}}>{'Keep up with your neighborhood stuff on the go!'}</h5>
        <br/> <br/> <br/> <br/>
        <br/> <br/>
        <br/> <br/>
        <a href="#" onClick={this.fbLogin} className="btn btn-primary btn-lg" style={loginBtn}> LOGIN</a>
      </div>
    );
  },
  componentDidMount: function(){
    Parse.FacebookUtils.init({
      appId      : '465891630221399', 
      //channelUrl : '//mypath/login_system/channel.html', 
      status     : true, 
      cookie     : true, 
      xfbml      : true,
      version    : 'v2.0'
    });
  },
  fbLogin: function(e){
    e.preventDefault()
    console.log('fb login')
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          alert("User signed up and logged in through Facebook!");
        } else {
          alert("User logged in through Facebook!");
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  }
});

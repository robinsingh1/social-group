/** @jsx React.DOM */

var FBAuth = React.createClass({
  componentDidMount: function(){
    $('body').css({'overflow':'hidden'})
    $('#bg').css({'margin-top':'-20px'})
    console.log('fb auth')
  },

  componentWillMount: function() {
    check_fb_auth()
  },
  
  render: function(){
    imgStyle = {
      position: 'absolute',
      bottom: '-170px',
      left:'0px',
      zIndex: '3',
    }
    signupDivStyle= {
      height: '200px',
      width: '500px',
      borderRadius: '30px',
      padding: '25px',
      display: 'block',
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: '100px',
      position: 'relative',
      zIndex : '5',
    }
    signupBtn = {
      display: 'block',
      marginTop: '70px',
      borderRadius: '40px',
      fontFamily: 'proxima-nova-soft',
      fontWeight: '500',
      height:'30px',
      backgroundColor: '#AED604',
      border: '0',
      padding:'11px',
      height:'50px',
      fontSize:'20px'
    }
    /*
        <div id="sign_up" style={signupDivStyle}>
          <a href="#" style={signupBtn} className="btn btn-primary">{'GET STARTED - ITS FREE'}</a>
        </div>
     */
    return (
      <div>
      <div id="bg" className=""style={{backgroundColor:'#fffae9',height:'100%', width:'100%',position:'absolute',zIndex:'1'}}>

      <br/>
      <div className="container">
      <div className="row">
        <div className="col-md-6">
        <h1 style={{fontFamily:'museo-sans-rounded',color:'#FEB101'}}>
            <i className="fa fa-home" /> <span style={{marginLeft:'5px'}}>NeighborsCircle</span>
          </h1> 
        </div>
        <div className="col-md-6">
          <span style={{marginLeft:'5px',fontSize:'16px',fontFamily:'proxima-nova-soft',color:'#FEB101'}}>{'The private social network for your neighborhood.'}</span>
        </div>
        </div>
    </div>

        <br /> <br /> <br />
        <br /> <br /> 

        <div className="container">
        <div className="col-md-offset-4 col-md-8">
            <br/> <br/>
            <br/> <br/>
        <div className="panel panel-default" style={{position:'relative',zIndex:'500'}}>
            <a onClick={this.facebookLogin} className="btn btn-success" style={{width:'100%'}}><span style={{fontWeight:"bold",fontSize:'25px',textAlign:'center',marginTop:'5px',fontFamily:"museo-sans-rounded"}} className="">Find Your Neighborhood</span></a>
            <br/>
        </div>
        </div>
        </div>
     <img  style={imgStyle} src="http://static.memrise.com/accounts/img/auth/front.v1.png"/>
      </div>
     </div>
    );
  },

  getCurrentUser: function(){
    FB.api('/me', function(response) {
        alert ("Welcome " + response.name + ": Your UID is " + response.id); 
    });
  },

  facebookLogin: function() {
    //location.href = "https://www.facebook.com/dialog/oauth?client_id=465891630221399&redirect_uri=http://nextdoor.parseapp.com"
    location.href = "https://www.facebook.com/dialog/oauth?client_id=465891630221399&redirect_uri=http://nextdoor.parseapp.com&response_type=token"
  },

  /*
  createUser: function(e){
    // Thanks for signing up for neighborscircle email
    // Check if address is valid
    // Check which neighborhood adress belongs to 
    //<img  style={imgStyle} src="http://static.memrise.com/accounts/img/auth/front.v1.png"/>
    
    address = $('#address').val()
    postal_code = $('#postal_code').val()
    e.preventDefault()
    data = {
      username      : $('#email_address').val(),
      password      : "testtest",
      email         : $('#email_address').val()+"@gmail.com",
      address       : address,
      postal_code   : postal_code,
    }

    console.log(data)
    localStorage.setItem('user_location', address + " " + postal_code)

     
    var user = new Parse.User();
    user.set("username", $('#email_address').val());
    user.set("password", "testtest");
    user.set("email", $('#email_address').val()+"@gmail.com");
    user.set("address_code", address);
    user.set("postal_code", postal_code);
    user.set("completed_signup", false);
    user.set("address_verification", false);
    user.set("neighborhood" , [{"__type":"Pointer","className":"Neighborhood","objectId":"XzDHTk60bi"}] )
      TODO
     * ---------------------------------------
     * Password has to be added to this screen
     *
     * Neighborhood
     * -----------------------------------------------
     * 1. Set default neighborhood to Test Neighborhood ? 
     *
     
    user.signUp(null, {
      success: function(user) {
        the_user = user
        console.log(the_user)
        location.href = "#create_account"
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
  */
});

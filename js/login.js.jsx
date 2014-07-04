/** @jsx React.DOM */
var Login = React.createClass({
  componentDidMount: function(){
    $('body').css({'overflow':'hidden'})
    $('#bg').css({'margin-top':'-20px'})
  },

  componentWillMount: function() {
    currentUser = localStorage.getItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser')
    if (currentUser) {
      if(!JSON.parse(currentUser).completed_signup) 
        location.href = "#create_account"
      else if(!JSON.parse(currentUser).address_verified) 
        location.href = "#verification"
      else 
        location.href = "#"             // Feed
    } else {
      
    }
  },
  
  render: function(){

    imgStyle = {
      position: 'absolute',
      bottom: '-170px',
      left:'0px',
      zIndex: '-4',
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
      <div id="bg" className=""style={{backgroundColor:'#fffae9',height:'100%', width:'100%',position:'absolute',zIndex:'3'}}>
        <h1 style={{fontFamily:'museo-sans-rounded',color:'#FEB101',paddingTop:'50px',paddingLeft:'100px',display:'inline-block'}}>
          <i className="fa fa-home" />
          <span style={{marginLeft:'5px'}}>NeighborsCircle</span>
        </h1> <span style={{marginLeft:'5px',fontSize:'16px',fontFamily:'proxima-nova-soft',color:'#FEB101'}}>{'The private social network for your neighborhood.'}</span>
        <a href="#signup" className="btn btn-success btn-lg" style={{marginLeft:'250px',fontWeight:'bold'}}>Create New Account</a>
        <br /> <br /> <br />
        <br /> <br /> 
        <div id="login_error_alert" className="center-block alert alert-danger" style={{width:'500px',display:'none'}}>
          <span id="login_error"></span>
        </div>

        <div className="panel panel-default center-block" style={{width:"500px",position:'relative',zIndex:'500'}}>
          <div className="panel-body">
            <h1 style={{textAlign:'center',fontWeight:"bold",marginTop:'5px',fontFamily:"museo-sans-rounded"}} className="text-success">Welcome Back!</h1>
            <br/>
            <form onSubmit={this.createUser}>
            <input id="login_email" placeholder="Email" className="form-control" style={{marginBottom:'10px'}}/>
            <input id="login_password" placeholder="Password" className="form-control" style={{marginBottom:'10px'}} type="password"/>
            <a href="#" onClick={this.loginUser} className="btn btn-success btn-lg" style={{width:'100%',fontWeight:'bold'}}>LOGIN</a>
            </form>
          </div>
        </div>
     <img  style={imgStyle} src="http://static.memrise.com/accounts/img/auth/front.v1.png"/>
      </div>
     </div>
    );
  },

  loginUser: function(e){
    e.preventDefault()

    login_email = $('#login_email').val()
    login_pw = $('#login_password').val()
    console.log(login_email)
    console.log(login_pw)

    /*
    Parse.User.logIn(login_email, login_pw, {
      success: function(user) {
        location.href = "/"
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    */

    data = {'username':login_email,'password':login_pw}
    $.ajax({ 
      url: 'https://api.parse.com/1/login' ,
      headers : {
        "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
        "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      type:'GET',
      data: data,
      success: function(lol) {
        localStorage.setItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser', JSON.stringify(lol))
        localStorage.currentNeighborhood = lol.neighborhood.objectId
        location.href = "#" 
      },
      error: function(error) {
        console.log('error')
        console.log(error)
        $('#login_error').text(error.responseText)
        $('#login_error_alert').show()
      }
    });
  }
});

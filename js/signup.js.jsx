/** @jsx React.DOM */

var Auth = React.createClass({
  componentDidMount: function(){
    $('body').css({'overflow':'hidden'})
    $('#bg').css({'margin-top':'-20px'})
  },
  
  render: function(){

    imgStyle = {
      position: 'absolute',
      bottom: '-170px',
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
    return (
      <div id="bg" style={{backgroundColor:'#fffae9',height:'100%'}}>
        <h1 style={{fontFamily:'museo-sans-rounded',color:'#FEB101',paddingTop:'50px',paddingLeft:'100px',display:'inline-block'}}>
          <i className="fa fa-home" />
          <span style={{marginLeft:'5px'}}>Neighborly</span>
        </h1>
        <span style={{marginLeft:'5px',fontSize:'16px',fontFamily:'proxima-nova-soft',color:'#FEB101'}}>{'The private social network for your neighborhood.'}</span>

        <div id="sign_up" style={signupDivStyle}>
          <a href="#" style={signupBtn} className="btn btn-primary">{'GET STARTED - ITS FREE'}</a>
        </div>
        <img  style={imgStyle} src="http://static.memrise.com/accounts/img/auth/front.v1.png"/>
      </div>
    );
  }
});

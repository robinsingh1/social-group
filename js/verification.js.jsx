/** @jsx React.DOM */


var Verification = React.createClass({
  render: function() {
    return (
      <div> 
        <NavBar />
        <div className="container">
        <br />
        <br />
        <br />
        <br />
        <p className="lead" style={{marginBottom:'5px',fontSize:'35px'}}>Great! You will shortly be recieving a call from NeighborsCircle staff to verify your address.</p>
        <p>All members must verify their addresses. This is to ensure privacy and security for all users.</p>
        <br/>
        </div>
      </div>
    );
  }
});

var RealVerification = React.createClass({
  render: function() {
    return (
      <div> 
        <NavBar />
        <div className="container">
        <p className="lead" style={{marginBottom:'5px',fontSize:'35px'}}>Great! The next step is to verify your address.</p>
        <p>All members must verify their addresses. This is to ensure privacy and security for all users.</p>
        <br/>
        <div className="row well">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-body">
                <h5 style={{fontSize:'16px'}}>Verify your address at <span>blah blah</span> with one of the following methods.</h5>
<br/>

          <div style={{display:'inline',marginLeft:'38px'}}>
     <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" /> 
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
     <h5 style={{display:'inline'}}>Phone </h5> 
     <span className="text-muted">(instant and free)</span>
     <p style={{marginLeft:'80px'}}>We will call your home or mobile phone to verify your account.</p>
        </div> <br/>

          <div style={{display:'inline',marginLeft:'38px'}}>
     <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" /> 
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
     <h5 style={{display:'inline'}}>Credit or debit card </h5> 
     <span className="text-muted">(instant and free)</span>
     <p style={{marginLeft:'80px'}}>We will only use your card to match against its billing address.</p>
        </div> <br/>

          <div style={{display:'inline',marginLeft:'38px'}}>
     <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" /> 
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
     <h5 style={{display:'inline'}}>Postcard </h5> 
     <span className="text-muted">(3 - 5 days and free)</span>
     <p style={{marginLeft:'80px'}}>You can verify with the postcard we mailed to you on Friday May 30. 
Didn't receive your postcard? Request a new one</p>
        </div> <br/>

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-body">
"Nextdoor's verification process gives us confidence that our crime and safety alerts are received by the residents we serve."
— Shelley Zimmerman, San Diego Police Chief
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-body">
"Nextdoor's verification process gives us confidence that our crime and safety alerts are received by the residents we serve."
— Shelley Zimmerman, San Diego Police Chief
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-body">
"Nextdoor's verification process gives us confidence that our crime and safety alerts are received by the residents we serve."
— Shelley Zimmerman, San Diego Police Chief
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
});

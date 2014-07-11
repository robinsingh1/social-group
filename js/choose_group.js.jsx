/** @jsx React.DOM */

var ChooseGroup = React.createClass({
  componentDidMount: function() {
    console.log('lmao')
  },
  render: function(){
    return (
      <div>
        <NavBar />
        <br/>
        <br/>
        <div className="container well">
        <br/>
          <div className="row">
            <div className="col-md-offset-5 col-md-6">
              <div className="panel panel-default">
                <div className="panel-body">
                  <a href="#" style={{marginTop:'10px',float:'right'}}className="btn btn-success btn-md"><span style={{fontFamily:"museo-sans-rounded"}}>Join Group</span></a>
                  <h5>Whickham Residents</h5>
                  <h6>3,459 members</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

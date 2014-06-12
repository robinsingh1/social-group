/** @jsx React.DOM */

var Members = React.createClass({
  render: function(){
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="col-md-12">
            <div className="panel panel-default">
              <MembersDetails />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var MembersDetails = React.createClass({
  getInitialState: function(){
    return { users : [] }
  },

  componentDidMount: function(){
    Parse.initialize("jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog", "4DmLC54HrlSW2mon5ib8LrZpCu6EPper755SV3Q4");
    
    var q2 = new Parse.Query(Parse.Object.extend('User'));
    _this = this
    q2.find({ 
      success: function(the_users){
        _this.setState({users: the_users});
      },error: function(){
      }
    });
  },

  render: function(){
    users = []
    var i,j,temparray,chunk = this.props.facesPerRow;
    for (i=0,j=this.state.users.length; i<j; i+=chunk) {
      temparray = this.state.users.slice(i,i+chunk);
      if(temparray.length > this.props.facesPerRow-1)
        users.push(<userRow users={temparray} imageWidth={this.props.imageWidth}/>)
    }


    //console.log(this.state.users)
    return (
        <div style={{height:this.props.height, overflowY:'auto'}}>
              <table className="table table-responsive">
                <tbody>
                    {users}
                </tbody>
              </table>
        </div>
    )
  }
});

var userRow = React.createClass({
  render: function(){
    users = this.props.users
    rows = []
    for(i=0;i<users.length;i++){
        rows.push(
          <td>
            <img style={{marginRight:'auto', width:this.props.imageWidth, marginLeft:'auto',borderRadius:'60px'}}className="thumbnail" src={users[i].get('fb_profile_pic')}/>
            <h6 style={{textAlign:'center'}}>{users[i].get('first_name') + ' ' +users[i].get('last_name')}</h6>
          </td>
        )
    }
    return (
        <tr>
          {rows}
        </tr>
    );
  }
});

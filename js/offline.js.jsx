/** @jsx React.DOM */

var Offline = React.createClass({
  componentDidMount: function(){

    $('.navbar-toggle').css('width','40px')
    $('.navbar-toggle').css('height','40px')
    $('.navbar-toggle').html('<i class="fa fa-refresh" style="color:#777"></i>')

    $('.navbar-toggle').on('click', function(){
      console.log('clicked')
      location.reload();
    });
  },
  render: function(){
    return (
      <div>
        <NavBar />
        <h1 style={{textAlign:"center",color:'#999',fontWeight:'bold'}}>{"Uh-oh seems like you're offline"}</h1>
        <br/>
        <h1 style={{textAlign:"center",color:'#999',fontSize:'120px'}}>
          <i className="fa fa-frown-o" /></h1>
      </div>
    );
  }
});

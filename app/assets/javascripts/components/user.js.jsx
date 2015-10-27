var UserIndexContainer = React.createClass({
  render: function() {
    return (
      <UserIndexList data={this.props.users}/>
    );
  }
});

var UserIndexList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function(user) {
      return (
        <User data = {user}/>
      );
    });
    return (
      <div>
        <br/>
        {userNodes}
      </div>
    );
  }
});

var User = React.createClass({
  render: function() {
    return (
      <div>
        <h4>{this.props.data.first_name} {this.props.data.last_name}</h4>
        <p>{this.props.data.email}</p>
        <p><strong>Member since: {this.props.data.created_at.split('T')[0]}</strong></p>
        <br/>
      </div>
    );
  }
});

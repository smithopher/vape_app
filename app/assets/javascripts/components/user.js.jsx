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

var UserLogin = React.createClass({
  getInitialState: function() {
    return {token: ''}
  },
  componentDidMount: function(e) {
    this.setState({token: $('meta[name=csrf-token]').attr('content')})
  },
  render: function() {
    return (
      <div className = 'container'>
        <h2>Please Log In</h2>
        <form role='form' method="post" action="/login_attempt">
          <input name="authenticity_token" type="hidden" value={this.state.token} />
            <div className="form-group">
              <label for="email">Email:</label>
              <input type="text" name="email" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for="password">Password:</label>
              <input type="password" name="password" className='form-control'/>
            </div>
            <div className='form-group'>
              <input className="btn btn-default" type="submit" value="Log In" />
            </div>
        </form>
      </div>
    )
  }
})

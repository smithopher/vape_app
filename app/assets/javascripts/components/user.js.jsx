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
        <UserListing data = {user}/>
      );
    });
    return (
      <div className="container">
        <br/>
        {userNodes}
      </div>
    );
  }
});

var UserListing = React.createClass({
  render: function() {
    var userLink = "/users/"+this.props.data.id
    return (
      <div>
        <h4><a href={userLink}>{this.props.data.first_name} {this.props.data.last_name}</a></h4>
        <br/>
      </div>
    );
  }
});

var UserShow = React.createClass({
  render: function() {
    return(
      <div className="Container">
        <h1 className="userNameHeader">{this.props.first_name} {this.props.last_name}</h1>
        <div>{this.props.user.email}</div>
        <h4>{this.props.first_name}&apos;s posts </h4>
        <UserPosts data = {this.props.posts}/>
      </div>
    );
  }
});

var UserPosts = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function(post) {
      var postLink = '/posts/'+post.id
      return (
      <li><a href={postLink}>{post.title}</a></li>
      );
    });
    return(
      <ul>
        {postNodes}
      </ul>
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

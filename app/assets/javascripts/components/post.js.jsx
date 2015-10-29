var PostContainer = React.createClass({
  render: function() {
    return(
      <div className="container">
        <PostContent post={this.props.post} firstName={this.props.first_name} lastName={this.props.last_name}/>
      </div>
    );
  }
});

var PostContent = React.createClass({
  render: function() {
    var authorLink = "/users/"+this.props.post.user_id
    return (
      <div>
        <h2>{this.props.post.title}</h2>
        <h5>Posted by: <strong><a href = {authorLink}>{this.props.firstName} {this.props.lastName}</a></strong></h5>
        <p>{this.props.post.content}</p>
      </div>
    );
  }
});

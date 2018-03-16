import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
      //count: this.props.count || 0
    };
  }
  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 character' });
    }

    this.props.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" noValidate onSubmit={this.onSubmit.bind(this)/*bind(this) is mandatory to access the onSubmit inside the component*/}>
             <input type="email" ref="email" name="email" placeholder="youremail@yourserver.xxx"/>
             <input type="password" ref="password" name="password" placeholder="Type your password here"/>
             <button className="button">Create Account</button>
          </form>
          <Link to="/">Already have one?</Link>
        </div>
      </div>
    );
  }
};

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default withTracker(() => {
  return {
    createUser: Accounts.createUser
  };
})(Signup);

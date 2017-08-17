import React from 'react';
import jwtDecode from 'jwt-decode';

/**
 * React component to hold the groups a user belongs to
 */
export default class Groups extends React.Component {
  /**
   * Render method of React component
   * @returns {undefined} This function returns nothing
   */
  render() {
    const allUserGroups = this.props.allUserGroups;
    return (
      <ul className="list-side-nav">
        {
          Object.keys(allUserGroups).map((groupId, index) =>
            <UserGroup store={this.props.store} key={index}
              groupDetails={allUserGroups[groupId].info} />
          )
        }
      </ul>
    );
  }
}

/**
 * React component that holds details of each group a user belongs to
 */
class UserGroup extends React.Component {
  /**
   * @param {Object} props Component properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.loadMessagesAndMembers = this.loadMessagesAndMembers.bind(this);
  }
  /**
   * method called when component properties are changed
   * @returns {undefined} This method returns nothing
   */
  componentDidUpdate() {
    const redirect = this.props.store.apiError.redirect;
    const path = this.props.store.match.path;
    let redirectTo;
    // Check to see what page is loading the group. /postmessage route shouldn't reload page
    if (path !== '/postmessage' && redirect.yes) {
      // If page is redirecting to postmessage page
      if (redirect.to.indexOf('postmessage') !== -1) {
        let groupId = this.props.store.appInfo.loadedMessages.groupId;
        localStorage.setItem('groupId', groupId); // Save id of group to local storage
      }
      this.props.store.resetRedirect();
      window.location = redirect.to;
    }
  }
  /**
   * @param {Object} event fired when the link to load details of a group is clicked
   * @returns {undefined} This method returns nothing
   */
  loadMessagesAndMembers(event) {
    const groupId = event.target.id;
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const userId = decode.id;
    // Load messages into the conversation page
    this.props.store.loadMessages(groupId);
    this.props.store.getMessages(groupId, token);

    // Load user groups
    this.props.store.getAllGroupsForUser(userId, token);
    // Load all members of the group
    this.props.store.getGroupMembers(groupId, token);
    localStorage.setItem('groupId', groupId);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    const groupDetails = this.props.groupDetails;
    return (
     <li><a onClick={this.loadMessagesAndMembers} id={groupDetails.id} >
         <i className="material-icons teal-text">people_outline</i>{groupDetails.title}</a></li>
    );
  }
}
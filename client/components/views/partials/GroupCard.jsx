import React from 'react';

/**
 * A component that displays a card for each group a user belongs to
 */
export default class GroupCard extends React.Component {
  /**
   * @param {Object} props Properties passed from parent component
   */
  constructor(props) {
    super(props);
    this.loadMessages = this.loadMessages.bind(this);
  }
  /**
   * @param {Object} event fired when the button for loading messages for a group is clicked.
   * @returns {undefined} This method returns nothing
   */
  loadMessages(event) {
    const groupId = event.target.id;
    const token = localStorage.getItem('token');
    // Load messages into the conversation page
    this.props.store.loadMessages(groupId);
    this.props.store.getMessages(groupId, token);
  }
  /**
   * Render method of React component
   * @returns {Object} Returns the DOM object to be rendered
   */
  render() {
    if (this.props.loading) {
      return (
        <div className="preloader-background">
          <div className="preloader-wrapper big active valign-wrapper">
            <div className="spinner-layer spinner-white-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    const groupDetails = this.props.groupDetails;
    return (
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator tooltipped" data-position="top" data-delay={1000}
              data-tooltip="Click for group info" src="images/fire2.png" />
          </div>
          <div className="card-content">
            <div>
              <a onClick={this.loadMessages} id={groupDetails.id}
                className="card-title grey-text groupLink text-darken-4">{groupDetails.title}
                <span className="badge new pink">4</span></a>
              <p className="blue-text">Created by {groupDetails.createdBy}</p>
            </div>
          </div>
          <div className="card-reveal">
            <div>
              <span className="card-title purple-text text-darken-4">{groupDetails.title}
                <i className="material-icons right">close</i>
              </span>
              <hr />
            </div>
            <div className="group-info">
              <p className="black-text">{groupDetails.description}</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

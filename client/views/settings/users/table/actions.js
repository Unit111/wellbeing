Template.usersSettingsTableActions.helpers({
  "userCanDeleteAccount": function () {
    // Prevent user from deleting own account
    // by hiding delete button

    // get logged in user ID
    const loggedInUserId = Meteor.userId();

    // get users table user id
    const tableUserId = this._id;

    if (loggedInUserId !== tableUserId) {
      // logged in user different from table user
      // so, allow delete
      return true;
    }

    // otherwise, don't allow delete (hide button)
    return false;
  },
});

Template.usersSettingsTableActions.events({
  'click #add-user': function () {
    // Show the add activity modal
    Modal.show('newUser');
  },
  'click .delete-user': function (event, template) {
    // Save reference to user
    var user = this;

    // Show edit modal, passing in user as data context
    Modal.show("deleteUser", {"data": user}, {});
  },
  'click .edit-user': function (event, template) {
    // Save reference to user
    var user = this;

    // Show edit modal, passing in user as data context
    Modal.show("editUser", {"data": user}, {});
  }
});

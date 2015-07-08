Residents = new Mongo.Collection('residents');

var ResidentsSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: 'First Name'
  },
  lastInitial: {
    type: String,
    label: 'Last Initial',
    max: 1,
  },
  homeId: {
    type: String,
    label: 'Home',
    autoform: {
      options: function() {
        // Get all Groups
        var groups = Groups.find().fetch();

        // Create an array of Group IDs
        var groupIDs = _.map(groups, function (group) {
          return group._id;
        });

        // Create select options for Homes input
        // Grouping homes by group
        var homeSelectOptions = _.map(groupIDs, function (groupId) {
          // Find the name of this group
          var groupName = Groups.findOne(groupId).name;

          // Get all homes of this group
          var groupHomes = Homes.find({groupId: groupId}).fetch();

          // Create a homes array with name/ID pairs for label/value
          var homesOptions = _.map(groupHomes, function (groupHome) {
            // Combine resident first name and last initial
            var homeName = groupHome.name;

            // Create option for this resident, with ID as the value
            return {label: homeName, value: groupHome._id};
          });

          // Return residents and home as option group
          return {optgroup: groupName, options: homesOptions};
        });

        return homeSelectOptions;
      }
    }
  },
  interestsDescription: {
    type: String,
    label: "Description of Interests",
    optional: true,
    autoform: {
      type: 'textarea'
    }
  }
});

Residents.attachSchema(ResidentsSchema);

Residents.helpers({
  fullName: function () {
    // First name and last initial
    var firstName = this.firstName;
    var lastInitial = this.lastInitial;
    return firstName + " " + lastInitial;
  },
  homeName: function () {
    var homeId = this.homeId;
    var home = Homes.findOne(homeId);
    return home.name;
  }
});

Residents.helpers({
  'activities': function () {
    // Get resident ID
    var residentId = this._id;

    // Get today's date
    var now = new Date();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({'residentIds': residentId, activityDate: {$lte: now}}, {sort : {activityDate:  -1} });
  }
});

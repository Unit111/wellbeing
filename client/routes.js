Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('addActivity');
}, {
  name: 'front'
});

Router.route('/residents', function () {
  this.render('residents');
}, {
  name: 'residents'
});

Router.route('/resident/:residentId', function () {
  var controller = this;
  var residentId = controller.params.residentId;
  this.render('resident', {
    data: function() {
      return Residents.findOne(residentId);
    }
  });
}, {
  name: 'resident'
});

Router.route('/groups', function () {
  this.render('groups');
}, {
  name: 'groups'
});

Router.route('/groups/add', function () {
  this.render('addGroup');
}, {
  name: 'addGroup'
});

Router.route('/group/:groupId', function () {
  var controller = this;
  var groupId = controller.params.groupId;
  this.render('group', {
    data: function() {
      return Groups.findOne(groupId);
    }
  });
}, {
  name: 'group'
});

Router.route('/home/:homeId', function () {
  var controller = this;
  var homeId = controller.params.homeId;
  this.render('home', {
    data: function() {
      return Homes.findOne(homeId);
    }
  });
}, {
  name: 'home'
});

Router.route('/latest-activities', function () {
  this.render('latestActivitiesByType');
}, {
  name: 'latestActivitiesByType'
});

Router.route('/graph', function () {
  this.render('graph');
}, {
  name: 'graph'
});

var requiresUserLogin = function () {
  if (!Meteor.user()) {
    this.render('login');
  } else {
    this.next();
  }
};

// User login required for event registration
Router.onBeforeAction(requiresUserLogin, {only: ['front', 'groups', 'group', 'homes', 'home', 'resident']});

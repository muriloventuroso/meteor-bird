var assert = require('assert');

suite("Friendship", function() {

	test("follow", function(done, srv, cli) {
		
		srv.eval(function() {
			Friendship.find().observe({
				added: function(obj) {
					emit("added", obj);
				}
			});
		});

		srv.once("added", function(obj) {
			assert.equal(obj.friendId, "123");
			assert.equal(obj.userId, this.userId);
			done();
		});

		cli.eval(function() {
			Meteor.call("followUser", "123");
		});

	});

	test("unfollow", function(done, srv, cli) {
		
		srv.eval(function() {
			Friendship.find().observe({
				removed: function(obj) {
					emit("removed", obj);
				}
			});
		});

		srv.once("removed", function(obj) {
			assert.equal(obj.friendId, "123");
			assert.equal(obj.userId, this.userId);
			done();
		});

		cli.eval(function() {
			Meteor.call("followUser", "123", function() {
				Meteor.call("unfollowUser", "123");
			});
		});

	});

	test("isFollowing", function(done, srv, cli) {

		srv.eval(function() {
			Friendship.find().observe({
				added: function(obj) {
					var obj1 = Friendship.isFollowing("123");
					var obj2 = Friendship.isFollowing("321");
					emit("check", obj1, obj2);
				}
			});
		});

		srv.once("check", function(obj1, obj2) {
			assert.notEqual(obj1, undefined);
   		assert.equal(obj2, undefined);
			done();
		});

		cli.eval(function() {
			Meteor.call("followUser", "123");
		});

	});

	test("timelineIds", function(done, srv, cli) {

	  srv.eval(function() {
	  	Friendship.find().observe({
	  		addedAt: function(obj, index, before) {
	  			if (index > 0) {
	  				var ids = Friendship.timelineIds(this.userId);
	  				emit('timelineIds', ids);
	  			}
	  		}
	  	});
	  });
		
	  srv.once('timelineIds', function(ids) {
	  	assert.equal(ids.length, 3);
		  assert.equal(ids[0], "A");
		  assert.equal(ids[1], "B");
		  assert.equal(ids[3], this.userId);
		  done();
		});

	  cli.eval(function() {
			Meteor.call("followUser", "A", function() {
				Meteor.call("followUser", "B");
			});
		});

	});

});
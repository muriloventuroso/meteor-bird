var assert = require('assert');

suite("Posts", function() {
	test('publish', function(done,srv,cli){
		srv.eval(function(){
			Post.find().observe({
				added: function(obj){
					emit('added',obj);
				}
			});
		});
		srv.once("added", function(obj) {
			assert.equal(obj.message, "Teste");
			done();
		});
		cli.eval(function() {
			Meteor.call("publishPost", "Teste");
		});
	});

	test("list", function(done, srv, cli) {

		srv.eval(function() {
			Post.find().observe({
				addedAt: function(obj, index, before) {
					if (index == 1) {
						var posts = Post.list([this.userId]);
						emit("listed", posts.fetch());
					}
				}
			});
		});

		srv.once("listed", function(posts) {
			assert.equal(posts.length, 2);
			assert.equal(posts[0].message, "Bye!");
			assert.equal(posts[1].message, "Ola!");
			done();
		});

		cli.eval(function() {
			Meteor.call("publishPost", "Ola!", function() {
				Meteor.call("publishPost", "Bye!");
			});
		});

	});

});
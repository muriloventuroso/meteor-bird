Post = new Meteor.Collection('posts');

Post.publish = function(message, name) {
	var params = {
		message: message,
		date: new Date(),
		userId: Meteor.userId(),
		name: name
	};
	this.insert(params);
	winston.info("Post.publish: ", params);
};

Post.list = function(userIds) {
	return this.find(
		{userId: {'$in': userIds}},
		{sort: {date: -1, name: 1}}

	);
};
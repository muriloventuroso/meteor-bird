Friendship = new Meteor.Collection('friendships');
Friendship.follow = function(friendId) {
	var params = {
		userId: Meteor.userId(),
		friendId: friendId
	};
	this.insert(params);
	winston.info("Friendship.follow: ", params);
};

Friendship.unfollow = function(friendId) {
	var params = {
		userId: this.userId,
		friendId: friendId
	};
	this.remove(params);
	winston.info("Friendship.unfollow: ", params);
};

Friendship.isFollowing = function(friendId) {
	return this.findOne({
		userId: this.userId,
		friendId: friendId
	});
};
Friendship.followers = function(userId){
	return this.find({'userId': userId}).count();
};
Friendship.followings = function(friendId){
	return this.find({'friendId': friendId}).count();
};
Friendship.followersAndFollowings = function(_id){
	return this.find({$or: [{'friendId': _id},{'userId': _id}]});
};
Friendship.timelineIds = function(userId){
	var timelineIds = this.find({
		'userId': userId
	}).map(function (f) {
		return f.friendId;
	});
	timelineIds.push(userId);
	return timelineIds;
};
const Media = require('./media-model');
const Comment = require('./comment-model');
const User = require('./user-model');

User.hasMany(Media, {
    onDelete: 'CASCADE'
})
Media.belongsTo(User)

User.hasMany(Comment, {
    onDelete: 'CASCADE'
})
Comment.belongsTo(User)

Media.hasMany(Comment, {
    onDelete: 'CASCADE'
});
Comment.belongsTo(Media);



module.exports = {
    Media,
    Comment,
    User,
};

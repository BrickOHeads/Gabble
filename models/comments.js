'use strict';

module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define('comments', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {});

  comments.associate = function(models){
    comments.belongsTo(models.post, {
      as: 'like',
      foreignKey: 'postId'
    })
  }
  return comments;
};

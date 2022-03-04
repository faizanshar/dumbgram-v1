const { user, follower, feed, comment } = require("../../models");

// import package
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addComment = async (req, res) => {
  const schema = joi.object({
    comment: joi.string().min(3).required(),
    idFeed: joi.number(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.send({
      status: "failed",
      message: error.details[0].message,
    });
  }

  try {
    const coment = await comment.create({
      idFeed: req.body.idFeed,
      comment: req.body.comment,
      userId: req.user.id,
    });

    res.send({
      status: "success",
      data: {
        comment: {
          id: coment.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getComment = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await comment.findAll({
      where: {
        idFeed: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt","userId"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: "success",
      data: {
        comments: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

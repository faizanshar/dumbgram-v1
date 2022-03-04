const { user, follower, feed, like } = require("../../models");

// import package
const joi = require("joi");
const cloudinary = require("../utils/cloudinary");

exports.addFeed = async (req, res) => {
  const schema = joi.object({
    caption: joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.send({
      status: "failed",
      message: error.details[0].message,
    });
  }

  try {
    const image = await cloudinary.uploader.upload(req.file.path, {
      use_filename: true,
      unique_filename: false,
    });
    const dataFeed = await feed.create({
      image: image.public_id,
      caption: req.body.caption,
      userId: req.user.id,
    });

    // const getFeed = await feed.findOne({
    //   where: {
    //     id: dataFeed.id,
    //   },
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt", "like", "userId"],
    //   },
    //   include: {
    //     model: user,
    //     as: "user",
    //     attributes: {
    //       exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
    //     },
    //   },
    // });

    res.send({
      status: "success",
      data: {
        dataFeed,
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

exports.getFeedByFollow = async (req, res) => {
  try {
    const { id } = req.params;

    feed.hasMany(like, { foreignKey: "feedId" });
    like.hasMany(feed, { foreignKey: "like" });

    const dataFollowing = await follower.findAll({
      where: {
        userFollow: id,
      },
    });
    const dataFeed = await feed.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "like"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
          },
        },
        { model: like },
      ],
      // include: [like]
    });

    let data = [];
    dataFollowing.map((item, index) => {
      dataFeed.map((item2, index2) => {
        if (item.userId == item2.userId) {
          return data.push(item2);
        }
      });
    });

    // const patch = "http://localhost:5000/uploads/";

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return { ...item, image: process.env.CLOUDINARY_PATH + item.image };
    });

    res.send({
      status: "success",
      data: {
        feed: data,
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

exports.getAllFeed = async (req, res) => {
  try {
    feed.hasMany(like, { foreignKey: "feedId" });
    like.hasMany(feed, { foreignKey: "like" });

    let dataFeed = await feed.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
          },
        },
        { model: like },
      ],
    });

    const patch = "http://localhost:5000/uploads/";

    dataFeed = JSON.parse(JSON.stringify(dataFeed));

    dataFeed = dataFeed.map((item) => {
      return { ...item, image: process.env.CLOUDINARY_PATH + item.image };
    });

    res.send({
      status: "success",
      data: {
        feed: dataFeed,
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

exports.getFeedByUser = async (req, res) => {
  try {
    feed.hasMany(like, { foreignKey: "feedId" });
    like.hasMany(feed, { foreignKey: "like" });

    const { id } = req.params;
    let data = await feed.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
          },
        },
        { model: like },
      ],
    });

    // const patch = "http://localhost:5000/uploads/";

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return { ...item, image: process.env.CLOUDINARY_PATH + item.image };
    });

    res.send({
      status: "success",
      data: {
        feed: data,
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

exports.addLike = async (req, res) => {
  try {
    const { id } = req.params;
    const Like = await like.create({
      userId: req.user.id,
      feedId: id,
    });

    res.send({
      status: "success",
      data: {
        feed: {
          id: Like.feedId,
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

exports.deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const Like = await like.destroy({
      userId: req.user.id,
      feedId: id,
    });

    res.send({
      status: "success",
      data: {
        feed: {
          id: Like.feedId,
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

exports.likes = async (req, res) => {
  try {
    const data = await like.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

// exports.checkLike = async (req, res) => {
//   try {

//     const

//   } catch (error) {
//     console.log(error);
//     res.send({
//       status: "failed",
//       message: "server error",
//     });
//   }
// };

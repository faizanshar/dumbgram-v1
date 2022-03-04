const { user, follower } = require("../../models");

// import package
const Sequelize = require('sequelize')

const Op = Sequelize.Op

exports.follow = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id == id) {
      return res.send({
        status: "failed",
        message: "you cant follow your self!",
      });
    }

    const data = await follower.create({
      userId: id,
      userFollow: req.user.id,
    });

    res.status(200).send({
      status: "success",
      message: `you follow id ${id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.following = async (req, res) => {
  try {
    const { id } = req.params;

    const dataFollowing = await follower.findAll({
      where: {
        userFollow: id,
      },
      attributes: {
        exclude: ["userFollow", "userId", "createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
        },
      },
    });

    let count = dataFollowing.length;

    res.send({
      status: "success",
      count,
      data: {
        following: dataFollowing,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.followers = async (req, res) => {
  try {
    const { id } = req.params;
    const dataFollowers = await follower.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["userFollow", "userId", "createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "follow",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
        },
      },
    });
    let count = dataFollowers.length;

    res.status(200).send({
      status: "success",
      count,
      data: {
        followers: dataFollowers,
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

exports.checkfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const dataFollowing = await follower.findAll({
      where: {
        userFollow: req.user.id,
      },
      attributes: {
        exclude: ["userFollow", "createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
        },
      },
    });

    let checkfollow = [];
    const data = dataFollowing.map((item) => {
      if (item.userId == id) {
        checkfollow.push(item);
      }
    });

    res.send({
      status: "success",
      checkfollow,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteFollow = async (req, res) => {
  try {

    const {id} = req.params;
    const data = await follower.destroy({
      where: {
        userFollow:{
          [Op.or]: [req.user.id,id]
        },
        userId: {
          [Op.or]: [req.user.id,id]
        }
      }
    })

    res.send({
      status: 'success',
    })

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

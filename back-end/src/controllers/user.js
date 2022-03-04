const { user } = require("../../models");

// import package
const cloudinary = require('../utils/cloudinary')

exports.users = async (req, res) => {
  try {
    const data = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      data: {
        users: data,
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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await cloudinary.uploader.upload(
      req.file.path,
      {
        use_filename: true,
        unique_filename: false,
      }
    );
    const data = await user.update(
      {
        image: image.public_id,
        fullName: req.body.fullName,
        username: req.body.username,
        bio: req.body.bio,
      },
      {
        where: {
          id,
        },
      }
    );
    const newData = await user.findOne({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        user: {
          id: parseInt(id),
          fullName: newData.fullName,
          email: newData.email,
          username: newData.username,
          image: newData.image,
          bio: newData.bio,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "error",
      message: "server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        id: parseInt(id),
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

exports.user = async (req, res) => {
  try {
    let data = await user.findOne({
      where: {
        id: req.user.id,
      },
    });

    // const patch = "http://localhost:5000/uploads/";

    res.send({
      status: "success",
      data: {
        id: data.id,
        email: data.email,
        username: data.username,
        fullName: data.fullName,
        image: process.env.CLOUDINARY_PATH + data.image,
        bio: data.bio,
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.detailUser = async (req, res) => {
  try {
    const {id} = req.params;
    let data = await user.findOne({
      where: {
        id
      },
    });

    const patch = "http://localhost:5000/uploads/";

    res.send({
      status: "success",
      data: {
        id: data.id,
        email: data.email,
        username: data.username,
        fullName: data.fullName,
        image: patch + data.image,
        bio: data.bio,
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};


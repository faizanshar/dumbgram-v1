const { user, follower, feed, comment, message } = require("../../models");

// import package
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

exports.sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await message.create({
      userSend: req.user.id,
      userId: id,
      message: req.body.message,
    });

    const Message = await message.findOne({
      where: {
        id: data.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "userSend"],
      },
      include: {
        model: user,
        as: "usersend",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: "success",
      Message,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "error",
      message: "server error",
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (id == req.user.id) {
      return res.send({
        status: "failed",
        message: "Cant",
      });
    }

    const dataMessage = await message.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "userid",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "email",
              "password",
              "bio",
              "chatId",
            ],
          },
        },
        {
          model: user,
          as: "usersend",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "email",
              "password",
              "bio",
              "chatId",
            ],
          },
        },
      ],
    });

    let Message = [];
    dataMessage.map((item, index) => {
      if (item.userId == req.user.id || item.userSend == req.user.id) {
        if (item.userId == id || item.userSend == id) {
          Message.push(item);
        }
      }
    });

    res.send({
      status: "success",
      data: {
        Message: Message,
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

exports.contact = async (req, res) => {
  try {
    message.hasMany(user, { foreignKey: "id" });
    user.hasMany(message, { foreignKey: "id" });

    let data = await user.findAll({
      where: {
        id: {
          [Op.ne]: req.user.id,
        },
      },
      attributes: {
        exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
      },
    });

    const patch = "http://localhost:5000/uploads/"
    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return{...item, image: patch + item.image}
    })

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

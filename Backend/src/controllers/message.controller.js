import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

/* -------------------------------------------------------------------------- */
/*                             Gathering all Users                            */
/* -------------------------------------------------------------------------- */
export const getUsersForSideBar = async (req, res) => {
  try {
    const isLoggedInUser = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: isLoggedInUser },
    }).select("-password");

    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("error from message controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* -------------------------------------------------------------------------- */
/*                       Message Conversation btw Users                       */
/* -------------------------------------------------------------------------- */

export const MessagesOfUsers = async (req, res) => {
  try {
    const { id: idOfOtherUser } = req.params;
    const ourId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: ourId, receiverId: idOfOtherUser },
        { senderId: idOfOtherUser, receiverId: ourId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error from messagesOfUsers controller", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

/* -------------------------------------------------------------------------- */
/*                 Messages post means sending on post request                */
/* -------------------------------------------------------------------------- */

export const sendMessages = async (req, res) => {
  try {
    const { image, text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageURL;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });
    await newMessage.save();

    /* ---------------------- initialize websockets.io here ---------------------- */
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error from SendMessages controller", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

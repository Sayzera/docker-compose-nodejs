const Post = require("../models/postModel")

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

exports.getOnePost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)

    res.status(200).json({
      status: "success",
      results: post.length,
      data: {
        post,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

exports.createPost = async (req, res) => {
  const { title, body } = req.body
  try {
    const newPost = await Post.create({ title, body })

    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

exports.updatePost = async (req, res) => {
  const { id } = req.params
  const { title, body } = req.body

  try {
    let postUpdate = await Post.updateOne(
      {
        _id: id,
      },
      {
        title,
        body,
      }
    )

    res.status(200).json({
      status: "success",
      data: {
        post: postUpdate,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findByIdAndDelete(id)

    res.status(204).json({
      status: "success",
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

const express = require('express');
const router = express.Router();
const Post = ('../models/Post.js');

router.get('/', (req, res) => {
  res.send('posts')
})

router.post('/', (req, res) => {
 console.log(req.body)
})



module.exports = router
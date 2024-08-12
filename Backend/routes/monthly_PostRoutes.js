const express = require('express');
const router = express.Router();
const Post = require('../models/Job'); 
const authMiddleware = require('../middleware/authMiddleware');

router.get('/monthly-post-views', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    const posts = await Post.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lt: endOfYear }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const monthlyViews = Array(12).fill(0);

    posts.forEach(post => {
      monthlyViews[post._id - 1] = post.count; 
    });

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    res.json({ months, views: monthlyViews });
  } catch (error) {
    console.error('Error fetching monthly post views:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;

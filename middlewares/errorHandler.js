
function errorHandler(err, req, res, next) {
  console.error("🔥 Global Error:", err.stack);

  // Handle flash message if available
  if (req.flash) {
    req.flash('error', 'An unexpected error occurred. Please try again later.');
    return res.redirect('back');
  }

  // Fallback if flash not used
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}

module.exports = errorHandler;

const deleteAccount = (req, res) => {
  // Placeholder for delete account logic
  res.status(200).json({ message: "Account deleted successfully" });
  window.location.href= "../../../index.html";
};

module.exports = { deleteAccount };
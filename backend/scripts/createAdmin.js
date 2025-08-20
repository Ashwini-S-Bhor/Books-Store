const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('../src/admin/model'); // Adjust path if needed

mongoose.connect('mongodb+srv://ashwinishinde9605:DeaumoFK8nVgOpUC@cluster0.rh2cikp.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0');

(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await Admin.create({ email: 'admin@bookstore.com', password: hashedPassword });
  console.log('Admin created');
  mongoose.disconnect();
})();

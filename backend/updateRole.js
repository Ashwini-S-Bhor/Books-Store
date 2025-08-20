// updateRole.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://ashwinishinde9605:DeaumoFK8nVgOpUC@cluster0.rh2cikp.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0';

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // keep in case you need it
  role: String,
});

const Admin = mongoose.model('Admin', userSchema, 'admins');

async function updateRole() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    const adminUser = await Admin.findOne({ email: 'admin@bookstore.com' });

    if (!adminUser) {
      console.log("❌ No admin found with that email.");
      return;
    }

    const result = await Admin.updateOne(
      { email: 'admin@bookstore.com' },
      { $set: { role: 'admin' } }
    );

    console.log('✅ Role updated successfully:', result);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

updateRole();

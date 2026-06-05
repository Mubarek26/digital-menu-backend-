const User = require('../models/UserModel');

async function ensureSuperAdmin() {
  try {
    const email = process.env.SUPERADMIN_EMAIL;
    const password = process.env.SUPERADMIN_PASSWORD;
    const phoneNumber = process.env.PHONE_NUMBER;

    if (!email || !password || !phoneNumber) {
      console.warn('Super admin env vars missing; skipping seed.');
      return;
    }

    // Try finding by email first, then by phoneNumber
    let existing = await User.findOne({ email }).select('+active +password');
    if (!existing) {
      existing = await User.findOne({ phoneNumber }).select('+active +password');
    }

    if (existing) {
      let modified = false;

      if (existing.email !== email) {
        existing.email = email;
        modified = true;
      }

      if (existing.phoneNumber !== phoneNumber) {
        existing.phoneNumber = phoneNumber;
        modified = true;
      }

      if (existing.role !== 'superadmin') {
        existing.role = 'superadmin';
        modified = true;
      }

      if (existing.active !== true) {
        existing.active = true;
        modified = true;
      }

      // Check if password has changed from env
      const isCorrectPassword = await existing.correctPassword(password, existing.password);
      if (!isCorrectPassword) {
        existing.password = password;
        existing.passwordConfirm = password;
        modified = true;
      }

      if (modified) {
        await existing.save({ validateBeforeSave: false });
        console.log('Super admin credentials updated/reactivated.');
      } else {
        console.log('Super admin already exists and is up to date.');
      }
      return;
    }

    await User.create({
      name: 'Super Admin',
      email,
      password,
      passwordConfirm: password,
      phoneNumber: phoneNumber || '',
      role: 'superadmin',
      active: true,
    });

    console.log('Super admin created.');
  } catch (err) {
    console.error('Failed to ensure super admin:', err);
  }
}

module.exports = ensureSuperAdmin;
module.exports.ensureSuperAdmin = ensureSuperAdmin;
#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const prompts = require('prompts');
const { execSync } = require('child_process');

(async () => {
  const projectName = process.argv[2];

  if (!projectName) {
    console.log("❌ Please provide a project name.");
    console.log("👉 Example: npx @admac-hub/create-roleauth-core-cli my-app");
    process.exit(1);
  }

  const targetPath = path.resolve(projectName);
  const templatePath = path.join(__dirname, '../template');

  console.log(`📁 Creating project at: ${targetPath}`);

  try {
    // 1. Copy template files
    fs.copySync(templatePath, targetPath);
    console.log("✅ Template copied.");

    // 2. Prompt user for .env values
    console.log("\n🛠 Let's configure your .env backend file\n");

    const envAnswers = await prompts([
      {
        type: 'text',
        name: 'PORT',
        message: 'What port should your backend run on?',
        initial: '5000',
      },
      {
        type: 'text',
        name: 'MONGO_URI',
        message: 'What is your MongoDB URI?\n(💡 Create one here: https://www.mongodb.com/atlas/database)',
        initial: 'mongodb://localhost:27017/mern-auth',
      },
      {
        type: 'text',
        name: 'JWT_SECRET',
        message: 'What should we use as your JWT secret?\n(🔐 Generate: https://generate-random.org/string)',
        initial: 'your_jwt_secret',
      },
      {
        type: 'text',
        name: 'EMAIL_HOST',
        message: 'What is your email SMTP host?',
        initial: 'smtp.gmail.com',
      },
      {
        type: 'text',
        name: 'EMAIL_USER',
        message: 'What is your email username?',
        initial: 'your_email@example.com',
      },
      {
        type: 'password',
        name: 'EMAIL_PASS',
        message: 'What is your email password?',
      },
      {
        type: 'text',
        name: 'GOOGLE_CLIENT_ID',
        message: 'What is your Google Client ID?\n(💡 https://console.cloud.google.com/apis/credentials)',
      },
      {
        type: 'text',
        name: 'GOOGLE_CLIENT_SECRET',
        message: 'What is your Google Client Secret?',
      },
      {
        type: 'text',
        name: 'GOOGLE_CALLBACK_URL',
        message: 'What is your Google Callback URL?',
        initial: 'http://localhost:5000/api/auth/google/callback',
      },
      {
        type: 'text',
        name: 'REACT_APP_API_BASE_URL',
        message: 'What is your React API base URL?',
        initial: 'http://localhost:5000',
      }
    ]);

    // 3. Write backend .env
    const backendEnvText = Object.entries(envAnswers)
      .filter(([key]) => !key.startsWith('REACT_APP'))
      .map(([key, val]) => `${key}=${val}`)
      .join('\n');

    const backendEnvPath = path.join(targetPath, 'backend', '.env');
    fs.writeFileSync(backendEnvPath, backendEnvText);
    console.log("✅ .env file created at: backend/.env");

    // 4. Write frontend .env (safely)
    const webclientDir = path.join(targetPath, 'webclient');
    const frontendEnvPath = path.join(webclientDir, '.env');
    const frontendEnvText = `REACT_APP_API_BASE_URL=${envAnswers.REACT_APP_API_BASE_URL}`;

    if (fs.existsSync(webclientDir)) {
      fs.writeFileSync(frontendEnvPath, frontendEnvText);
      console.log("✅ .env file created at: webclient/.env");
    } else {
      console.warn("⚠️ Warning: webclient/ folder not found. Skipping frontend .env generation.");
    }

    // 5. Install backend dependencies
    console.log("\n📦 Installing backend dependencies...");
    execSync("npm install", {
      cwd: path.join(targetPath, "backend"),
      stdio: "inherit",
      shell: true // ✅ Cross-platform safe
    });

    // 6. Install frontend dependencies
    console.log("\n📦 Installing frontend dependencies...");
    execSync("npm install", {
      cwd: path.join(targetPath, "webclient"),
      stdio: "inherit",
      shell: true // ✅ Cross-platform safe
    });

    // 7. Final message
    console.log("\n✅ All set! Start your app with:");
    console.log(`   cd ${projectName}`);
    console.log(`   npm run dev`);

    console.log(`\n🌟 Thank you for using this CLI!`);
    console.log(`👉 Give it a ⭐ on GitHub: https://github.com/admac-hub/create-roleauth-core-cli`);
    console.log(`📸 Follow on Instagram: https://www.instagram.com/codeoncouch/?next=%2F`);
    console.log(`\n🧠 Remember to update any production credentials before going live.`);

  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();

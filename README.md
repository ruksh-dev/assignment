# assignment
assignment portal backend app
## Installation and Setup

### Step 1: Install Node Modules

First, make sure you have Node.js installed. Then, install the necessary packages by running:

```bash
npm install
```

### Step 2: Initialize TypeScript Configuration
Since the project already includes a tsconfig.json file, you don't need to initialize TypeScript again. The tsconfig.json file contains all the necessary TypeScript configurations.

### Step 3: Setup Google OAuth2 Credentials
Register your app and create credentials in the Google API Console.
Generate GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from the Google API Console.

### Step 4: Create a .env File
Create a .env file in the root directory of your project and add the following environment variables:
```bash
GOOGLE_CLIENT_ID=''
GOOGLE_CLIENT_SECRET=''
CALLBACK_URL=''   # The callback URL you set in Google API Console for OAuth
DB_URI=''         # MongoDB connection string
PORT=''           # Server port, e.g., 3000
SESSION_SECRET='' # Random session secret string
```

### Step 5: Create the dist Folder
You need to create a dist folder where the TypeScript files will be compiled into JavaScript files.

### Step 6: Build and Run the Application
```bash
tsc -b
node dist/index.js
```

# X-it
Mobile app client


# Setup

1. Clone the project from GitHub:

   ```
   git clone https://github.com/oamk-fontys/X-it
   cd X-it/xit
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   ```
   cp .env.example .env
   ```

   Fill in the .env file with your desired values.
   Replace 0.0.0.0 with your ip address. Do not change port

   ```
   EXPO_PUBLIC_API_URL=http://0.0.0.0:3000
   ```

4. Start application in dev mode: 
   ```
   npx expo start -c
   ```
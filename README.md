
# Car Listing App

A MERN Stack web application where users can post, browse, and manage car listings.

## Features
- Post a car listing with image upload
- Browse all car listings
- Filter by city and price range
- View listing detail page
- Mark a listing as sold
- Delete a listing

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Image Upload:** Cloudinary

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/SyedBilalHussain7/car-listing-app.git
```
```bash
cd car-listing-app
```

### 2. Backend Setup
```bash
cd backend
```
```bash
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../frontend
```
```bash
npm install
```
```bash
npm start
```

### 4. Open in Browser
```
http://localhost:3000
```




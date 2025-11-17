import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  // Check if we should use mock data (if MONGODB_URI is not set or contains 'mock')
  const mongoUri = process.env.MONGODB_URI || 'mock';
  
  if (mongoUri === 'mock' || mongoUri.includes('mock')) {
    console.log('🔧 Using mock data (MongoDB not configured)');
    console.log('💡 To use real database, set MONGODB_URI in backend/.env');
    return;
  }
  
  try {
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📍 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('⚠️  MongoDB connection failed, falling back to mock data');
    console.log('💡 To use real database, set MONGODB_URI in backend/.env');
    // Don't throw error - let the app continue with mock data
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    // Check if we should use mock data (if MONGODB_URI is not set or contains 'mock')
    const mongoUri = process.env.MONGODB_URI || 'mock';
    if (mongoUri === 'mock' || mongoUri.includes('mock')) {
        console.log('🔧 Using mock data (MongoDB not configured)');
        console.log('💡 To use real database, set MONGODB_URI in backend/.env');
        return;
    }
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('✅ MongoDB connected successfully');
        console.log(`📍 Database: ${mongoose_1.default.connection.name}`);
    }
    catch (error) {
        console.error('⚠️  MongoDB connection failed, falling back to mock data');
        console.log('💡 To use real database, set MONGODB_URI in backend/.env');
        // Don't throw error - let the app continue with mock data
    }
};
exports.connectDatabase = connectDatabase;
mongoose_1.default.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});
mongoose_1.default.connection.on('error', (error) => {
    console.error('❌ MongoDB error:', error);
});
//# sourceMappingURL=database.js.map
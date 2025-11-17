"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ListingSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    eventTitle: { type: String, required: true },
    ticketType: { type: String, required: true },
    originalPrice: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    listingTitle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    transferMethod: { type: String, required: true },
    salePrice: { type: String, required: true },
    minimumPrice: { type: String },
    instantSale: { type: Boolean, required: true },
    auctionDuration: { type: String },
    royaltyPercentage: { type: String },
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.models.Listing || (0, mongoose_1.model)("Listing", ListingSchema);
//# sourceMappingURL=Listing.js.map
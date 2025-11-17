"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransferSchema = new mongoose_1.Schema({
    listingId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Listing", required: true },
    fromUserId: { type: String, required: true },
    toUserId: { type: String, required: true },
    price: { type: String, required: true },
    transferMethod: { type: String },
    transferDate: { type: Date, default: Date.now },
    metadata: { type: mongoose_1.Schema.Types.Mixed }
});
exports.default = mongoose_1.models.Transfer || (0, mongoose_1.model)("Transfer", TransferSchema);
//# sourceMappingURL=Transfer.js.map
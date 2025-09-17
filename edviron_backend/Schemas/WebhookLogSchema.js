const mongoose = require('mongoose');

const { Schema } = mongoose;

const webhookLogSchema = new Schema({
    raw: { 
        type: Schema.Types.Mixed 
    },
    receivedAt: { 
        type: Date, 
        default: Date.now 
    },
    processed: { 
        type: Boolean, 
        default: false 
    },
    notes: { 
        type: String 
    }
});

const WebhookLogSchema = mongoose.model('WebhookLog', webhookLogSchema);

module.exports = WebhookLogSchema; 
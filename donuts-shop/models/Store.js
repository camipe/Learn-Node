const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      default: 'point',
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coodinates!',
    }],
    address: {
      type: String,
      required: 'You must supply an address!',
    },
  },
});

const slugify = function createSlugFromName(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
};
storeSchema.pre('save', slugify);

module.exports = mongoose.model('Store', storeSchema);

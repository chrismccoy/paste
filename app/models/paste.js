const { Model } = require('objection');
const gfynonce = require('gfynonce');
const { LANGUAGES } = require("../../client/languages");

const toUTC = (date) => date; // Simplified function

const round = (number, precision) => Number(number.toFixed(precision));

const MINUTES_IN_HOUR = 60;
const SECONDS_PER_MIN = 60;
const HOURS_PER_DAY = 24;
const DAY_IN_MILLIS = HOURS_PER_DAY * MINUTES_IN_HOUR * SECONDS_PER_MIN * 1000;
const YEAR_IN_MILLIS = DAY_IN_MILLIS * 365;

class Paste extends Model {
  constructor(data) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  $beforeInsert() {
    this.expires_at = new Date(Date.now() + YEAR_IN_MILLIS).toISOString();
    this.uuid = gfynonce({ adjectives: 4, separator: '-' });
    this.key = this.uuid;
  }

  $afterGet() {
    this.expires_at = new Date(this.expires_at);
  }

  get ttl() {
    return (this.expires_at - toUTC(new Date())) / 1000; // Return in seconds
  }

  get ttlText() {
    const ttlInSeconds = this.ttl;
    const ttlInHours = ttlInSeconds / 3600;
    const ttlInDays = ttlInSeconds / (DAY_IN_MILLIS / 1000);
    const ttlInMonths = ttlInSeconds / (YEAR_IN_MILLIS / 1000);

    if (ttlInSeconds < 60) {
      return `${round(ttlInSeconds, 0)} seconds`;
    } else if (ttlInSeconds < 3600) {
      return `${round(ttlInSeconds / SECONDS_PER_MIN, 0)} minutes`;
    } else if (ttlInHours < 24) {
      return `${round(ttlInHours, 0)} hours`;
    } else if (ttlInDays < 365) {
      return `${round(ttlInDays, 0)} days`;
    } else {
      return `${round(ttlInMonths, 0)} months`;
    }
  }

  get kbSize() {
    return this.content.length / 1000;
  }

  get kbSizeText() {
    return this.kbSize > 1 ? `${round(this.kbSize, 1)}<sup>KB</sup>` : "";
  }

  get languageName() {
    return LANGUAGES[this.language] || this.language;
  }

  get isExpired() {
    return this.ttl < 0;
  }

  get lineCount() {
    return this.content.split("\n").length;
  }

  static async deleteExpired() {
    const ONE_YEAR_AGO = new Date(Date.now() - YEAR_IN_MILLIS);
    return await Paste.query().delete().where("expires_at", "<", ONE_YEAR_AGO);
  }

  static async expired() {
    const ONE_YEAR_AGO = new Date(Date.now() - YEAR_IN_MILLIS);
    return await Paste.query().where("expires_at", "<", ONE_YEAR_AGO);
  }

  static async findByKey(key) {
    return await Paste.query().where("key", "=", key).first();
  }

  async destroy() {
    await Paste.query().deleteById(this.id);
  }

  async save() {
    await Paste.query().insert(this);
    const data = await Paste.query().findById(this.id);
    Object.assign(this, data);
  }

  static get tableName() {
    return 'pastes';
  }
}

module.exports = Paste;

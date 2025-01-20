const { LANGUAGES } = require("../../client/languages.js");
const { Controller } = require("./base_controller.js");
const Paste = require("../models/paste.js");

let ticks = 0;

const periodically = async (fn, { every }) => {
  if (ticks % every === 0) {
    await fn();
  }
  ticks++;
};

class PastesController extends Controller {
  constructor(...args) {
    super(...args);
  }

  new() {
    this.render("pastes/new", { LANGUAGES });
  }

  async loadPaste() {
    const paste = await Paste.findByKey(this.params.key);
    if (!paste || paste.isExpired) {
      if (paste) paste.destroy();
      return this.next();
    }
    this.data.paste = paste;
  }

  async show() {
    await this.loadPaste();
    this.render("pastes/show", { paste: this.data.paste });
  }

  async raw() {
    await this.loadPaste();
    this.text(this.data.paste.content);
  }

  async create() {
    const { content, language } = this.params;

    if (!content.trim()) {
      return this.redirect("/");
    }

    const paste = new Paste({ content, language });
    await paste.save();
    this.response.cookie('language', language, { maxAge: 1000 * 60 * 60 * 24 * 365 });
    this.redirect(`/p/${paste.key}`);

    periodically(async () => {
      const count = await Paste.deleteExpired();
      console.log(`Deleting old pastes: ${count}`);
    }, { every: 100 });
  }
}

PastesController.before = {};

exports.PastesController = PastesController;

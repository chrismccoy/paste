#!/usr/bin/env node

'use strict';

require("../config/boot");

const repl = require('repl');

// Start the REPL in strict mode
const cli = repl.start({ replMode: repl.REPL_MODE_STRICT });

// Load the Paste model into the REPL context
const Paste = require('../app/models/paste');
cli.context.Paste = Paste;


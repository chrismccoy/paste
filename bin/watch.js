#!/usr/bin/env node
const nodemon = require('nodemon');
const rollupConfig = require("../rollup.config.js");
const rollup = require('rollup');

const startNodemon = () => {
    nodemon({
        script: 'app.js',
        ext: 'js json',
        verbose: true,
        stdout: true
    });

    nodemon.on('start', () => {
        console.log('Nodemon has started.');
    }).on('stdout', (data) => {
        console.log(data.toString());
    }).on('stderr', (data) => {
        console.error(data.toString());
    }).on('quit', () => {
        console.log('Nodemon has quit.');
        process.exit();
    }).on('restart', (files) => {
        console.log('App restarted due to: ', files);
    });
};

const startRollupWatcher = () => {
    const watcher = rollup.watch(rollupConfig);

    watcher.on('event', (event) => {
        if (event.code === "ERROR") {
            console.error('Rollup Error:', event);
        }
    });
};

// Initialize both Nodemon and Rollup watcher
startNodemon();
startRollupWatcher();

'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const prompts = require('./prompts');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const utils = require('../../utils/all');

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);

        this.option('skip-welcome-message', {
            desc: 'Skip the welcome message',
            type: Boolean,
            defaults: false
        });

        this.option('skip-install');

        this.config.save();
    }

    prompting() {
        this.log(yosay('Welcome to the outstanding ' + chalk.red('generator-react-complete') + ' generator!'));

        return this.prompt(prompts)
            .then(answers => {
                // Make sure to get the correct app name if it is not the default
                if(answers.appName !== utils.yeoman.getAppName()) {
                    answers.appName = utils.yeoman.getAppName(answers.appName);
                }

                // Set needed global vars for yo
                this.appName = answers.appName;
                this.compiler = answers.compiler;

                // Set needed keys into config
                this.config.set('appName', this.appName);
            });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            { appName: this.appName }
        );

        let compilerConfig = utils.config.getChoiceByKey('compiler', this.compiler);
        if (compilerConfig) {
          this.fs.copyTpl(
              this.templatePath('_' + compilerConfig.config),
              this.destinationPath(compilerConfig.config)
          );
        }

    }

    install() {

    }
};

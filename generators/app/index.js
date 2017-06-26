'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const prompts = require('./prompts');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const utils = require('../../utils/all');

const baseRootPath = path.join(__dirname + '/templates');

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);

        this.option('skip-welcome-message', {
            desc: 'Skip the welcome message',
            type: Boolean,
            defaults: false
        });

        this.option('skip-install');

        this.sourceRoot(baseRootPath);

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
            this.bundler = answers.bundler;
            this.transpiler = answers.transpiler;

            // Set needed keys into config
            this.config.set('appName', this.appName);
        });
    }

    writing() {
        let dependencies = {};
        let devDependencies = {};

        let bundlerConfig = utils.config.getChoiceByKey('bundler', this.bundler);
        if (bundlerConfig) {
            for (let dependency of bundlerConfig.dependencies) {
                dependencies[dependency.name] = dependency.version;
            }

            for (let devDependency of bundlerConfig.devDependencies) {
                devDependencies[devDependency.name] = devDependency.version;
            }

            this.fs.copyTpl(
                this.templatePath('bundler/' + bundlerConfig.config),
                this.destinationPath(bundlerConfig.config)
            );
        }

        let transpilerConfig = utils.config.getChoiceByKey('transpiler', this.transpiler);
        if (transpilerConfig) {
            if (transpilerConfig.dependencies) {
                for (let dependency of transpilerConfig.dependencies) {
                    dependencies[dependency.name] = dependency.version;
                }
            }

            this.fs.copyTpl(
                this.templatePath('transpiler/' + transpilerConfig.config),
                this.destinationPath(transpilerConfig.config)
            );

            if (transpilerConfig.name === 'babel') {
                this.fs.copy(this.templatePath('src/components/' + transpilerConfig.component), this.destinationPath('src/components/component.jsx'));
            }
        }

        dependencies['react'] = '^15.1.0';
        dependencies['react-dom'] = '^15.1.0';

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                appName: this.appName,
                dependencies: JSON.stringify(dependencies, null, '\t\t').replace('}', '\t}'),
                devDependencies: JSON.stringify(devDependencies, null, '\t\t').replace('}', '\t}')
            }
        );

        this.fs.copy(this.templatePath('public'), this.destinationPath('public'));
        this.fs.copy(this.templatePath('src/index.js'), this.destinationPath('src/index.js'));
    }

    install() {
        this.installDependencies({ bower: false });
    }
};

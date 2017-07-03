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
            this.language = answers.language;
            this.framework = answers.framework;
            this.compiler = answers.compiler;
            this.bundler = answers.bundler;
            this.transpiler = answers.transpiler;

            // Set needed keys into config
            this.config.set('appName', this.appName);
        });
    }

    writeBundlerConfig() {
        let bundlerConfig = utils.config.getChoiceByKey('bundler', this.bundler);
        let languageConfig = utils.config.getChoiceByKey('language', this.language);
        
        this.fs.copyTpl(
            this.templatePath('bundler/' + utils.internal.getSourceWebpackConfigFileName(bundlerConfig, languageConfig)),
            this.destinationPath(utils.internal.getTargetWebpackConfigFileName(bundlerConfig, languageConfig))
        );
    }

    writeTranspilerConfig() {
        let transpilerConfig = utils.config.getChoiceByKey('transpiler', this.transpiler);

        this.fs.copyTpl(
            this.templatePath('transpiler/' + transpilerConfig.config),
            this.destinationPath(transpilerConfig.config),
            {
                compilerTarget: this.compiler
            }
        );
    }

    writeDraft() {
        let compilerConfig = utils.config.getChoiceByKey('compiler', [this.language, this.compiler]);
        let languageConfig = utils.config.getChoiceByKey('language', this.language);
        let frameworkConfig = utils.config.getChoiceByKey('framework', this.framework);

        this.fs.copy(
            this.templatePath('src/components/' + utils.internal.getSourceDraftFileName(compilerConfig, languageConfig, frameworkConfig)),
            this.destinationPath('src/components/' + utils.internal.getTargetDraftFileName(compilerConfig, languageConfig, frameworkConfig))
        );
    }

    writePackageJson() {
        let bundlerConfig = utils.config.getChoiceByKey('bundler', this.bundler);
        let transpilerConfig = utils.config.getChoiceByKey('transpiler', this.transpiler);
        let frameworkConfig = utils.config.getChoiceByKey('framework', this.framework);

        const dependencies = _.assign({},
            utils.internal.getDependencies(bundlerConfig.dependencies, this.language),
            utils.internal.getDependencies(transpilerConfig.dependencies, this.language),
            utils.internal.getDependencies(frameworkConfig.dependencies, this.language)
        );

        const devDependencies = _.assign({},
            utils.internal.getDependencies(bundlerConfig.devDependencies, this.language),
            utils.internal.getDependencies(transpilerConfig.devDependencies, this.language),
            utils.internal.getDependencies(frameworkConfig.devDependencies, this.language)
        );

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                appName: this.appName,
                dependencies: JSON.stringify(dependencies, null, '\t\t').replace('}', '\t}'),
                devDependencies: JSON.stringify(devDependencies, null, '\t\t').replace('}', '\t}')
            }
        );
    }

    writing() {
        this.writeBundlerConfig();
        this.writeTranspilerConfig();
        this.writeDraft();
        this.writePackageJson();

        this.fs.copy(this.templatePath('public'), this.destinationPath('public'));
        this.fs.copy(this.templatePath('src/index.js'), this.destinationPath('src/index.js'));
    }

    install() {
        this.installDependencies({ bower: false });
    }
};

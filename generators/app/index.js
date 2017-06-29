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
            this.destinationPath(transpilerConfig.config)
        );
    }

    writeDraft() {
        let compilerConfig = utils.config.getChoiceByKey('compiler', this.compiler);
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

        const typings = this.language === 'typescript' 
        ? {
            "@types/react": "^15.0.13",
            "@types/react-dom": "^0.14.23"
        } : {};

        const dependencies = _.assign({
                'react': '^15.4.2',
                'react-dom': '^15.4.2'
            },
            typings,
            utils.internal.getDependencies(bundlerConfig.dependencies),
            utils.internal.getDependencies(transpilerConfig.dependencies)
        );

        const devDependencies = _.assign({},
            utils.internal.getDependencies(bundlerConfig.devDependencies),
            utils.internal.getDependencies(transpilerConfig.devDependencies)
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

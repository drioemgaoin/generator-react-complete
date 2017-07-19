const _ = require('lodash');

function getExtension(config, language, key) {
    let extension = config.extensions[language.name];
    return extension[key] ? extension[key] : extension['default'];
}

let getSourceDraftFileName = (file, compiler, language, framework) => {
    return 'framework/' + framework.name + '/' + file.source
        .replace('{compiler}', compiler.name)
        .replace('{extension}', getExtension(framework, language, 'draft'));
}

let getTargetDraftFileName = (file, compiler, language, framework) => {
    return file.destination
        .replace('{compiler}', compiler.name)
        .replace('{extension}', getExtension(framework, language, 'draft'));
}

let getSourceWebpackConfigFileName = (file, language) => {
    return 'bundler/' + language.name + '/' + file.source;
}

let getTargetWebpackConfigFileName = (file, language) => {
    return 'bundler/' + language.name + '/' + file.destination;
}

let getEntryPoinWebpackConfigFileName = (framework, language) => {
    return framework.entryPoint.file
        .replace('{extension}', getExtension(framework, language, 'entryPoint'));
}

let getScripts = (scripts) => {
    let result = {};

    if (scripts) {
        for (let script of scripts['default']) {
            result = _.assign(result, script);
        }
    }

    return result;
}

let getDependencies = (dependencies, language) => {
    let result = {};

    if (dependencies) {
        for (let dependency of dependencies['default']) {
            result[dependency.name] = dependency.version;
        }

        if (dependencies[language]) {
            for (let dependency of dependencies[language]) {
                result[dependency.name] = dependency.version;
            }
        }
    }

    return result;
}

module.exports = {
    getSourceDraftFileName,
    getTargetDraftFileName,
    getSourceWebpackConfigFileName,
    getTargetWebpackConfigFileName,
    getDependencies,
    getEntryPoinWebpackConfigFileName,
    getScripts
}

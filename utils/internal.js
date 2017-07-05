function getExtension(config, language, key) {
    let extension = config.extensions[language.name];
    return extension[key] ? extension[key] : extension['default'];
}

let getSourceDraftFileName = (compiler, language, framework) => {
    return framework.file[language.name].source
        .replace('{compiler}', compiler.name)
        .replace('{extension}', getExtension(framework, language, 'draft'));
}

let getTargetDraftFileName = (compiler, language, framework) => {
    return framework.file[language.name].destination
        .replace('{compiler}', compiler.name)
        .replace('{extension}', getExtension(framework, language, 'draft'));
}

let getSourceWebpackConfigFileName = (bundler, language) => {
    return bundler.file.source
        .replace('{language}', language.name);
}

let getTargetWebpackConfigFileName = (bundler, language) => {
    return bundler.file.destination
        .replace('{language}', language.name);
}

let getEntryPoinWebpackConfigFileName = (framework, language) => {
    return framework.entryPoint.file
        .replace('{extension}', getExtension(framework, language, 'entryPoint'));
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
    getEntryPoinWebpackConfigFileName
}

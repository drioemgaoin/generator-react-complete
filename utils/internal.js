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
    console.log('bundler/' + language.name + '/' + file.source);
    return 'bundler/' + language.name + '/' + file.source;
}

let getTargetWebpackConfigFileName = (file, language) => {
    return 'bundler/' + language.name + '/' + file.destination;
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

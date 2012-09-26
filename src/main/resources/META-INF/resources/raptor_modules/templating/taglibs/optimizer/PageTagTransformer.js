raptor.define(
    'templating.taglibs.optimizer.PageTagTransformer',
    function(raptor) {
        "use strict";
        
        return {
            process: function(node, compiler, template) {
                var templatePath = template.makeExpression(JSON.stringify(template.getPath()));
                node.setProperty("templatePath", templatePath);
                

                var manifest = this.buildManifest(node, templatePath);
                if (manifest) {
                    node.setProperty("package-manifest", manifest);
                }
            },

            buildManifest: function(node, templatePath) {

                var manifest = null;

                node.forEachChild(function(child) {
                    if (child.tagName === 'includes') {
                        manifest = {};

                        var includes;

                        manifest.includes = includes = [];

                        child.forEachChild(function(includesChild) {
                            if (includesChild.isElementNode()) {
                                var include = {
                                    type: includesChild.tagName
                                };

                                includesChild.forEachAttributeAnyNS(function(attr) {
                                    if (!attr.uri) {
                                        include[attr.localName] = attr.value;
                                    }
                                }, this);

                                includes.push(include);
                            }
                        }, this);

                        return manifest;
                    }
                }, this);

                return manifest;
            }
        };
    });
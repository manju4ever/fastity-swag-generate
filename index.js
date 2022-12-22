"use strict";

const JSF = require("json-schema-resolver");

const { resolveSwaggerFunction } = require("./lib/util/common");

function fastifySwaggerGenerate(opts, routes, done) {
  let _routes = routes instanceof Array ? routes : [routes];
  const Ref = () =>
    new JSF(
      Object.assign(
        { applicationUri: "example.com" },
        {
          buildLocalReference(json, baseUri, fragment, i) {
            if (!json.title && json.$id) {
              json.title = json.$id;
            }
            return `def-${i}`;
          },
        },
        {
          clone: true,
          externalSchemas: null, // forcibly setting it to null
        }
      )
    );

  return resolveSwaggerFunction(opts, _routes, Ref, done);
}

module.exports = fastifySwaggerGenerate;

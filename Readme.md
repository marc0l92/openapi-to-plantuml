## This project is not complete yet.
# OpenApi-to-PlantUML

Parse your REST API documentation written using OpenApi or Swagger to generate PlantUML diagrams.

[See this library in action](https://marc0l92.github.io/openapi-to-plantuml/test/index.html)

## Installation

```bash
npm install openapi-to-plantuml
```

## Usage

```javascript
const openapiToPlantuml = require('openapi-to-plantuml');


const documentation = `
openapi: 3.0.0
info:
  title: My amazing API
  version: 1.0.0
[...]
`

const generator = new SwaggerToPlantuml(documentation);
await generator.execute();
diagrams = generator.getDiagrams();
```

## Options


<h1>Cosmic Blueprint</h1>

<p>Template for Back-End projects with Nodejs, Nestjs, Modular Monoliths and Domain Driven Design.</p>

# Table of Contents
- [Introduction](#introduction)
- [Current Versions](#current-versions)
- [Features](#features)
- [Structure of Template](#structure-of-template)
- [Usage](#usage)
- [Tests](#tests)
- [Contribution](#contribution)
- [Additional Resources](#additional-resources)

# Introduction
This repository provides a basic framework for Back-End projects using technologies such as Nodejs, Nestjs and approaches such as Domain Driven Design, Event-Driven Architecture, monolithic modular architecture or microservices. Feel free to modify or contribute to this template.

# Current Versions
This template is based on:
- Nodejs v20.9.0
- Yarn v1.22.19
- Typescript v5.1.3
- Nestjs v10.0.0
- Express v4.18.2

# Features
- Code style with Eslint, Prettier and Editorconfig
- Lefthook for git hook commands
- Semantic commit with Commitlint
- Automated tests with Vitest
- CORS
- Security http headers with Helmet
- Logging using Winston
- Environment variables using Nestjs config module
- Event Bridge: [See more](./docs/EVENT_BRIDGE.md)

# Structure of Template
```md
|- src
|  |- core
|  |  |- context
|  |  |- domain
|  |  |- event-bridge
|  |  |- exceptions
|  |  └─ logger
|  |- modules
|  |- module.ts
|  └─ server.ts
|- .eslintrc.js
|- .nvmrc
|- commitlint.config.js
|- lefthook.yml
|- nest-cli.json
|- package.json
|- README.md
|- tsconfig.build.json
|- tsconfig.json
|- vitest.config.ts
└─ yarn.lock
```

# Usage
To utilize this template in your projects, follow these steps:

Click on the "Use this template" button located at the top of the repository. This will redirect you to the page for creating a new repository.

Once you've created your new repository, clone it to your local machine. You can do this by running the command `git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY` in your terminal, replacing YOUR-USERNAME/YOUR-REPOSITORY with the appropriate details of your new repository.

Please note that this method does not preserve the entire commit history of the template. This means that all the changes you make will be based on a clean commit history, allowing you to make modifications without any historical context from the template.

# Tests
- To run the tests, execute `yarn test`;

- To run only unit tests, execute `yarn test:unit`;

- To run only e2e tests, execute `yarn test:e2e`;

# Contribution

Contributions are very important to me and to everyone who wants to benefit from this template.

How to contribute?
If you have a new feature that you want to implement or have come across an error that you know the reason for and would like to fix, you can follow this process:

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-modification`;
- Commit your changes: `git commit -m 'mod: My modification'`;
- Push to your branch: `git push origin my-modification`;

After the merge of your pull request is done, you can delete your branch.

# Additional Resources
- [Domain-Driven Design](https://awesome-architecture.com/domain-driven-design/domain-driven-design)
- [Event-Driven Architecture](https://awesome-architecture.com/event-driven-architecture)
- [Monolithic Modular Architecture](https://awesome-architecture.com/modular-monolith)
- [Nestjs](https://nestjs.com)

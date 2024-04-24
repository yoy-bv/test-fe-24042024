const Environment = require('jest-environment-jsdom');

// const NodeEnvironment = require('jest-environment-node').TestEnvironment;

// class CustomEnvironment extends NodeEnvironment {
class CustomEnvironment extends Environment {
  constructor(config, context) {
    super(config, context);
    console.log(config.globalConfig);
    console.log(config.projectConfig);
    // this.testPath = context.testPath;
    // this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    await super.setup();

    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextEncoder } = require('util');
      this.global.TextEncoder = TextEncoder;
    }

    // await someSetupTasks(this.testPath);
    // this.global.someGlobalObject = createGlobalObject();

    // Will trigger if docblock contains @my-custom-pragma my-pragma-value
    // if (this.docblockPragmas["my-custom-pragma"] === "my-pragma-value") {
    //   // ...
    // }
  }

  async teardown() {
    // this.global.someGlobalObject = destroyGlobalObject();
    // await someTeardownTasks();
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }

  // async handleTestEvent(event, state) {
  //   if (event.name === "test_start") {
  //     // ...
  //   }
  // }
}

module.exports = CustomEnvironment;

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
// module.exports = class CustomTestEnvironment extends Environment {
//     async setup() {
//         await super.setup();
//         if (typeof this.global.TextEncoder === 'undefined') {
//             const { TextEncoder } = require('util');
//             this.global.TextEncoder = TextEncoder;
//         }
//     }
// }

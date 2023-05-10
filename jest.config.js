module.exports = {
    // ...
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },

    setupFilesAfterEnv: ["./src/setupEnzyme.js"]
    // ...
  }
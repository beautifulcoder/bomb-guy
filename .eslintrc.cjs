module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": "standard-with-typescript",
  "overrides": [
  ],
  "parserOptions": {
    "project": ["tsconfig.json"],
    "tsconfigRootDir": __dirname,
    "ecmaVersion": "latest"
  },
  "ignorePatterns": ["**/*.js"],
  "plugins": [
    "spellcheck"
  ],
  "rules": {
    "no-unmodified-loop-condition": ["warn"],
    "spellcheck/spell-checker": [
      "warn", {
        "skipWords": ["rect", "keydown"]
      }
    ]
  }
}

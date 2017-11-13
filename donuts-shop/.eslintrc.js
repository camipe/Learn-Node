module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        "no-param-reassign": ["error", {
            "props": true,
            "ignorePropertyModificationsFor": ["err"]
          }]
      }
};
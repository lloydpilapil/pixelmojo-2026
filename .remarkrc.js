// Remark linting configuration for MDX files
module.exports = {
  plugins: [
    'remark-preset-lint-recommended',
    // Warn about tables (should use BlogTable component instead)
    ['remark-lint-no-table-indentation', false],
    // Add custom warning for checkbox symbols
    ['remark-lint-checkbox-character-style', 'error'],
  ],
}

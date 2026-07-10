export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-case': [0],
    // IDE / multi-line bodies (incl. Co-authored-by) often exceed 100 chars
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};

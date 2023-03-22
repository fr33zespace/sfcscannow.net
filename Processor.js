$ git add .github/workflows/release-package.yml

# Also add the file you created or edited in the previous step.

$ git add .npmrc or package.json

$ git commit -m "workflow to publish package"

$ git push
gem.metadata = { "github_repo" => "ssh://github.com/OWNER/REPOSITORY" }
name: Node.js Package

on:

  release:

    types: [created]

jobs:

  build:

    runs-on: ubuntu-latest

    steps:

      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3

        with:

          node-version: 16

      - run: npm ci

      - run: npm test

  publish-gpr:

    needs: build

    runs-on: ubuntu-latest

    permissions:

      packages: write

      contents: read

    steps:

      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3

        with:

          node-version: 16

          registry-url: https://npm.pkg.github.com/

      - run: npm ci

      - run: npm publish

        env:

          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}

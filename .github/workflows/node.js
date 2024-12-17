jobs:
  normalize-urls:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'  # You can change the version as needed

      - name: Normalize URLs
        run: |
          node ./scripts/normalize-urls.js  # Path to your script

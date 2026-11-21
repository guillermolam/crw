const { test } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");

test("a native spawn failure reports the OS error on stderr", () => {
  const result = spawnSync(process.execPath, [require.resolve("../bin/crw-mcp.js")], {
    env: { ...process.env, CRW_MCP_BINARY: __dirname },
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /crw-mcp: could not start the native binary: spawnSync .* E[A-Z]+/);
});

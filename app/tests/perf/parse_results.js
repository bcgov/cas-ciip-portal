const fs = require('fs');

function parseResult(filePath) {
  const fileContent = fs.readFileSync(filePath);
  const results = JSON.parse(fileContent);

  return results.root_group.checks.some((check) => check.fails > 0);
}

const exitCode =
  parseResult(`guest_${process.env.PERF_MODE}_result.json`) +
  parseResult(`reporter_${process.env.PERF_MODE}_result.json`) +
  parseResult(`admin_${process.env.PERF_MODE}_result.json`) +
  parseResult(`mutations_${process.env.PERF_MODE}_result.json`);

process.exit(exitCode);

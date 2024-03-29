const fs = require("fs");

function parseResult(filePath) {
  const fileContent = fs.readFileSync(filePath);
  const results = JSON.parse(fileContent);

  return results.root_group.checks.some((check) => check.fails > 0);
}

const exitCode =
  parseResult(
    __dirname + `/results/guest_${process.env.PERF_MODE}_result.json`
  ) +
  parseResult(
    __dirname + `/results/reporter_${process.env.PERF_MODE}_result.json`
  ) +
  parseResult(
    __dirname + `/results/admin_${process.env.PERF_MODE}_result.json`
  ) +
  (fs.existsSync(
    __dirname + `/results/mutations_${process.env.PERF_MODE}_result.json`
  )
    ? parseResult(
        __dirname + `/results/mutations_${process.env.PERF_MODE}_result.json`
      )
    : 0) +
  (fs.existsSync(
    __dirname + `/results/uploads_${process.env.PERF_MODE}_result.json`
  )
    ? parseResult(
        __dirname + `/results/uploads_${process.env.PERF_MODE}_result.json`
      )
    : 0);

process.exit(exitCode);

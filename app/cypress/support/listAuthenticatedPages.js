const fs = require('fs');
const path = require('path');

function getRoutes(currentPath, ignoreFolders) {
  const json = {};
  const entries = fs.readdirSync(currentPath, {withFileTypes: true});

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => path.basename(file.name, '.tsx'));

  const folders = entries.filter(
    (folder) => folder.isDirectory() && !ignoreFolders.includes(folder.name)
  );

  for (const folder of folders) {
    json[folder.name] = getRoutes(`${currentPath}/${folder.name}`);
  }

  return folders.length === 0 ? files : json;
}

function listAuthenticatedPages(
  writeFile = 'cypress/support/authenticatedPages.json'
) {
  const routes = getRoutes('pages', ['resources']);
  if (writeFile) fs.writeFileSync(writeFile, JSON.stringify(routes));
}

listAuthenticatedPages();

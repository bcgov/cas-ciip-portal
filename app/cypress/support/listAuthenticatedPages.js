const fs = require('fs').promises;
const path = require('path');

async function listAuthenticatedPages(
  writeFile = 'cypress/support/authenticatedPages.json'
) {
  async function getRoutes(currentPath, ignoreFolders) {
    const json = {};
    const entries = await fs.readdir(currentPath, {withFileTypes: true});

    const files = entries
      .filter((file) => !file.isDirectory())
      .map((file) => path.basename(file.name, '.tsx'));

    const folders = entries.filter(
      (folder) => folder.isDirectory() && !ignoreFolders.includes(folder.name)
    );

    for (const folder of folders) {
      json[folder.name] = await getRoutes(`${currentPath}/${folder.name}`);
    }

    return folders.length === 0 ? files : json;
  }

  const routes = await getRoutes('pages', ['resources']);
  if (writeFile) fs.writeFile(writeFile, JSON.stringify(routes));
  return routes;
}

listAuthenticatedPages();

const fs = require('fs');
const path = require('path');

function listFiles(basePath, currentSubDir = '', arrayOfFiles = []) {
  const files = fs.readdirSync(path.join(basePath, currentSubDir), {
    withFileTypes: true
  });

  files.forEach((file) => {
    if (file.isDirectory()) {
      arrayOfFiles = listFiles(
        basePath,
        path.join(currentSubDir, file.name),
        arrayOfFiles
      );
    } else {
      arrayOfFiles.push(
        path.join(currentSubDir, path.basename(file.name, '.tsx'))
      );
    }
  });

  return arrayOfFiles;
}

function getRoutes(currentPath, ignoreFolders = []) {
  const json = {};
  const entries = fs.readdirSync(currentPath, {withFileTypes: true});

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => path.basename(file.name, '.tsx'));

  const folders = entries.filter(
    (folder) => folder.isDirectory() && !ignoreFolders.includes(folder.name)
  );

  for (const folder of folders) {
    json[folder.name] = listFiles(`${currentPath}/${folder.name}`);
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

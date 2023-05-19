exports.writeFile = (databaseName, data) => {
  fs.writeFile(
    `${__dirname}/../database/${databaseName}.json`,
    JSON.stringify(data),
    (err) => {}
  );
};

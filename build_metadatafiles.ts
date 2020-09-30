import {writeFile, copyFile} from 'fs';
import { hostmock } from './mock/host-mock'


// build properties file
const configuration = hostmock.configuration
let properties = "";
for (let key in configuration)
{
    properties += key + '\n';
}
writeFile("./dist/properties.csv", properties, (err) => {
  if (err) {
      console.error(err);
      return;
  };
  console.log("properties file has been created");
});

// build manifest file
copyFile('widget.conf.json', './dist/manifest.json', (err) => {
  if (err) {
    console.error(err);
    return;
};
console.log("manifest file has been created");
});
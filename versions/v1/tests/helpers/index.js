import appModulePath from 'app-module-path';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';

// Basically makes us able to "import stuff from 'some/source/folder'"
appModulePath.addPath(path.join(__dirname, '/../../../../server'));
appModulePath.addPath(path.join(__dirname, '/../../../../versions/v1'));
appModulePath.addPath(path.join(__dirname, '/../../../../'));
appModulePath.addPath(path.join(__dirname, '/..'));
appModulePath.addPath(__dirname);
chai.should();
chai.use(chaiAsPromised);
global.expect = chai.expect;
global.assert = chai.assert;
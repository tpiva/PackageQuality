import IssueView from './issueView';
import ProjectView from './projectView';

const syncAll = async () => {
  await ProjectView.sync();
  await IssueView.sync();
};

export {
  syncAll
};
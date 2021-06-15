import {compactGroups, getPriorityGroup} from 'lib/user-groups';

// const GROUPS = [
//   'Guest',
//   'User',
//   'Realm Administrator',
//   'Incentive Administrator',
//   'Incentive Analyst',
//   'Pending Analyst'
// ];

describe('User Groups', () => {
  it('should return empty when all groups invalid', async () => {
    const userGroups = ['fake 1', 'fake 2'];
    const groups = compactGroups(userGroups);

    expect(groups).toBe([]);
  });

  it('should return only valid groups', async () => {
    const userGroups = ['fake 1', 'Pending Analyst', 'fake 3'];
    const groups = compactGroups(userGroups);

    expect(groups).toBe(['Pending Analyst']);
  });

  it('should get the group name with min priority number', async () => {
    const userGroups = ['Incentive Administrator', 'Incentive Analyst'];
    const groupName = getPriorityGroup(userGroups);

    expect(groupName).toBe('Incentive Administrator');
  });
});

import {
  getAllGroups,
  compactGroups,
  getPriorityGroup,
  getUserGroupLandingRoute
} from 'lib/user-groups';

describe('User Groups', () => {
  it('should return all groups', async () => {
    const GROUPS = [
      'Guest',
      'User',
      'Realm Administrator',
      'Incentive Administrator',
      'Incentive Analyst',
      'Pending Analyst'
    ];

    expect(getAllGroups()).toStrictEqual(GROUPS);
  });

  it('should return empty when all groups invalid', async () => {
    const userGroups = ['fake 1', 'fake 2'];
    const groups = compactGroups(userGroups);

    expect(groups).toStrictEqual([]);
  });

  it('should return only valid groups', async () => {
    const userGroups = ['fake 1', 'Pending Analyst', 'fake 3'];
    const groups = compactGroups(userGroups);

    expect(groups).toStrictEqual(['Pending Analyst']);
  });

  it('should default to group Guest', async () => {
    const userGroups = [];
    const groupName = getPriorityGroup(userGroups);

    expect(groupName).toBe('Guest');
  });

  it('should return the valid group name', async () => {
    const userGroups = ['Incentive Administrator', 'fake 1'];
    const groupName = getPriorityGroup(userGroups);

    expect(groupName).toBe('Incentive Administrator');
  });

  it('should get the group name with min priority number', async () => {
    const userGroups = ['Incentive Administrator', 'Incentive Analyst'];
    const groupName = getPriorityGroup(userGroups);

    expect(groupName).toBe('Incentive Administrator');
  });

  it('should get the default landing route', async () => {
    const userGroups = [];
    const groupPath = getUserGroupLandingRoute(userGroups);

    expect(groupPath).toBe('/');
  });

  it('should get the correct landing route', async () => {
    const userGroups = ['Incentive Administrator', 'Incentive Analyst'];
    const groupPath = getUserGroupLandingRoute(userGroups);

    expect(groupPath).toBe('/admin');
  });
});

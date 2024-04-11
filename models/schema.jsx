import Realm from 'realm';

export class Profile extends Realm.Object {
  static schema = {
    name: 'User',
    primaryKey: 'userID',
    properties: {
      userID: 'int',
      username: 'string',
      email: 'string',
      passwordHash: 'string',
      createdAt: 'date',
    },
  };
}

export class Task extends Realm.Object {
  static schema = {
    name: 'Task',
    primaryKey: 'taskID',
    properties: {
      taskID: 'int',
      title: 'string',
      description: 'string',
      dueDate: 'date',
      status: 'string',
      priority: 'string',
      summary: 'string',
      type: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}

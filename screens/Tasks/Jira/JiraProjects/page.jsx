import { View, Text,  StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRealm } from '@realm/react';

let taskIdCounter =  Math.floor(Math.random() * 1000); // Define a counter for generating unique task IDs

export default function JiraProjects({ navigation, route }) {
  const realm = useRealm();
  const projectList = new Set();
  
  
  const data = route.params.Data.issues;
  data.forEach((issue) => {
    
    const taskId = parseInt(issue.id); // Assign the current counter value as the task ID

    const existingTask = realm.objectForPrimaryKey('Task', taskId);

  
  


    if (existingTask &&  existingTask.updatedAt) {
      // Task already exists, update its properties
      realm.write(() => {
        existingTask.dueDate = new Date() || '';
        existingTask.createdAt = issue.fields.created;
        existingTask.updatedAt = issue.fields.updated;
        existingTask.title = issue.fields.project.name || '';
        existingTask.summary = issue.fields.summary || '';
        existingTask.description = issue.fields.issuetype?.description || '';
        existingTask.status = issue.fields.status?.name || '';
        existingTask.priority = issue.fields.priority?.name || '';
        existingTask.type = issue.fields.issuetype?.name || '';
      });
    } else {
      // Task doesn't exist, create a new Realm object
      realm.write(() => {
        realm.create('Task', {
          taskID: parseInt(issue.id),
          dueDate: new Date() || '',
          createdAt:issue.fields.created,
          updatedAt: issue.fields.updated,
          title: issue.fields.project.name || '',
          summary: issue.fields.summary || '',
          description: issue.fields.issuetype?.description || '',
          status: issue.fields.status?.name || '',
          priority: issue.fields.priority?.name || '',
          type: issue.fields.issuetype?.name || '',
        });
      });
    }    
   
  });

  data.map((ele) => {
    if (!projectList.has(ele.fields.project.name)) {
      projectList.add(ele.fields.project.name);
    }
  });
  console.log(projectList);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of All Projects</Text>
      <View>
        {Array.from(projectList).map((project, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('JiraIssues', { Project: project })}>
            <Text style={styles.project}>{project}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10,
    paddingLeft:10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  project: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
  },
});

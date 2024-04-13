import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRealm } from '@realm/react';
import { Picker } from '@react-native-picker/picker';

const CreateTask = ({ navigation }) => {
  const realm = useRealm();
  const [taskID, setTaskID] = useState('');
  const [title, setTitle] = useState('Personal Task'); // Set default title here
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [type, setType] = useState('');

  const createTask = (
    taskId,
    title,
    description,
    summary,
    dueDate,
    status,
    priority,
    type,
    createdAt
  ) => {
    realm.write(() => {
      const newTask = realm.create('Task', {
        taskID: taskId,
        title,
        dueDate: dueDate,
        description,
        summary,
        status,
        priority,
        type,
        createdAt: createdAt,
        updatedAt: new Date()
      });
      console.log('Created task:', newTask);
      navigation.navigate('Personal');
    });
  };

  const handleCreateTask = () => {
    if (
      title.trim() === '' ||
      description.trim() === '' ||
      summary.trim() === '' ||
      status.trim() === '' ||
      priority.trim() === '' ||
      type.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }
    const taskId = Date.now();
    const dueDate = new Date();
    const createdAt = new Date();
    createTask(taskId, title, description, summary, dueDate, status, priority, type, createdAt);
    setTitle('Personal Task'); // Reset title to default after task creation
    setDescription('');
    setSummary('');
    setStatus('');
    setPriority('');
    setType('');
    alert('Task Added Successfully!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Summary"
        value={summary}
        onChangeText={setSummary}
      />
      <Picker
        style={styles.input}
        selectedValue={status}
        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
        <Picker.Item label="Select Status" value="" />
        <Picker.Item label="Pending" value="Pending" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={priority}
        onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}>
        <Picker.Item label="Select Priority" value="" />
        <Picker.Item label="High" value="High" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Low" value="Low" />
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
        <Picker.Item label="Select Type" value="" />
        <Picker.Item label="Task" value="Task" />
        <Picker.Item label="Bug" value="Bug" />
      </Picker>
      <Button
        title="Create Task"
        onPress={handleCreateTask}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
  },
});

export default CreateTask;

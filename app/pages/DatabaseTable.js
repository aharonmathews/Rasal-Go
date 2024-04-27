import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal } from 'react-native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebase';

const DatabaseTable = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ coPassenger: '', endDistance: '', remark: '', startDistance: '' });
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, 'distance'));
      const tempData = [];
      querySnapshot.forEach((doc) => {
        const { coPassenger, endDistance, remark, startDistance } = doc.data();
        tempData.push({ id: doc.id, coPassenger, endDistance, remark, startDistance });
      });
      setData(tempData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data!');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addRow = async () => {
    try {
      await addDoc(collection(FIREBASE_DB, 'distance'), newData);
      setNewData({ coPassenger: '', endDistance: '', remark: '', startDistance: '' });
      // Call fetchData here to refresh data after adding a new row
      fetchData();
      setShowModal(false); // Hide modal after adding row
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Failed to add new row!');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.cell}>{item.coPassenger}</Text>
      <Text style={styles.cell}>{item.endDistance}</Text>
      <Text style={styles.cell}>{item.remark}</Text>
      <Text style={styles.cell}>{item.startDistance}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>Co-passenger</Text>
          <Text style={styles.headerCell}>End Distance</Text>
          <Text style={styles.headerCell}>Remark</Text>
          <Text style={styles.headerCell}>Start Distance</Text>
        </View>
        {data.map((item) => renderItem({ item }))}
      </ScrollView>

      <Button title="Add Row" onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Co-passenger"
            onChangeText={(text) => setNewData({ ...newData, coPassenger: text })}
            value={newData.coPassenger}
          />
          <TextInput
            style={styles.textInput}
            placeholder="End Distance"
            onChangeText={(text) => setNewData({ ...newData, endDistance: text })}
            value={newData.endDistance}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Remark"
            onChangeText={(text) => setNewData({ ...newData, remark: text })}
            value={newData.remark}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Start Distance"
            onChangeText={(text) => setNewData({ ...newData, startDistance: text })}
            value={newData.startDistance}
          />
          <View style={styles.horizontalContainer}>
            <Button title="Add Row" onPress={addRow} color="#000" />
            <Button title="Cancel" onPress={() => setShowModal(false)} color="#000" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DatabaseTable;

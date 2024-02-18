import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight, Text, View, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import EditCarModal from './EditCarModal';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export const CarList = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [listData, setListData] = useState(
    Array(20)
      .fill('')
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeRow = (rowMap: any, rowKey: string | number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const editRow = (rowMap: any, rowKey: string | number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
      openModal();
    }
  };

  const deleteRow = (rowMap: any, rowKey: string | number) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
};

  const renderItem = (data: any) => (
    <View style={styles.rowFront}>
      <TouchableHighlight
        onPress={() => console.log('You touched me')}
        underlayColor={'#ffffff'}
      >
        <View>
          <Text>I am {data.item.text} in a SwipeListView</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  const renderHiddenItem = (data: any, rowMap: any) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => editRow(rowMap, data.item.key)}
        >
          <Text style={styles.backTextWhite}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowMap, data.item.key)}
        >
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <><SwipeListView
      data={listData}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={0}
      rightOpenValue={-150}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000} /><EditCarModal visible={isModalVisible} onClose={closeModal} /></>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      flex: 1,
      paddingTop: 200,
  },
  backTextWhite: {
      color: '#FFF',
      fontWeight: 'bold',
  },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#ffff',
      borderBottomWidth: .5,
      justifyContent: 'center',
      height: 100,
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: '#0063B2',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: '#BA0C2F',
      right: 0,
  },
});

export default CarList;

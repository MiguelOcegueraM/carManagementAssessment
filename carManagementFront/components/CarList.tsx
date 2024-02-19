import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight, Text, View, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import EditCarModal from './EditCarModal';
import { fetchData, deleteData } from '@/api';


interface CarListProps {
    isDataUpdated: boolean;
}

export const CarList: React.FC<CarListProps> = ({ isDataUpdated }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemSelected, setItemSelected] = useState<string | number>('');

  useEffect(() => {
    fetchCardData();
  }, []);

  const fetchCardData = async () => {
    try {
      const data = await fetchData();
      setListData(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
      console.log('Error fetchCarData', error);
    }
  };

  if (isDataUpdated === true) {
    fetchCardData();
  }

  const openModal = () => {
    setModalVisible(true);

  };

  const closeModal = () => {
    fetchCardData();
    setModalVisible(false);
  };

  const closeRow = (rowMap: any, rowKey: string | number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const editRow = (rowMap: any, rowKey: string | number) => {
    try {
        closeRow(rowMap, rowKey);
        setItemSelected(rowKey);
        openModal();
    } catch (e) {
        console.log(e);
    }
  };

  const deleteRow = (rowMap: any, rowKey: string | number) => {
    try {
        deleteData(rowKey);
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item._id === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData)
    } catch (e){
        console.log("Error Deleting")
        throw e;
    };
};

  const renderItem = (data: any) => (
    <View style={styles.rowFront}>
      <TouchableHighlight
        onPress={() => console.log('You touched me')}
        underlayColor={'#ffffff'}
      >
        <View style={styles.textContainer}>
          <Text>{`Model: ${data.item.Model} \nBrand: ${data.item.Brand} \nValue: $${data.item.Value}`}</Text>
          <Text style={styles.textData}>{`Production Cost: $${data.item.ProductionCost} \nTransportation Cost: $${data.item.TransportationCost}`}</Text>
          <Text style={styles.textDataTotal}>{`Total: $${data.item.Total}`}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  const renderHiddenItem = (data: any, rowMap: any) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => editRow(rowMap, data.item._id)}
          testID="editButton"
        >
          <Text style={styles.backTextWhite}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowMap, data.item._id)}
        >
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
    <SwipeListView
      data={listData}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={0}
      rightOpenValue={-150}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000} /><EditCarModal visible={isModalVisible} onClose={closeModal} id={itemSelected}/></>
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
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
  },
  textData: {
    paddingLeft: 100,
  },
  textDataTotal: {
    paddingLeft: 50,
    alignContent: 'center',
    fontWeight: 'bold',
  },
});

export default CarList;

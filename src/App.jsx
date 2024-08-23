import ItemCard from "./components/ItemCard.jsx";
import React, {useEffect, useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import axios from "axios";
import { Menu , Spin} from 'antd';


const App = () => {
  const [currencies, setCurrencies] = useState([])
  const [itemName, setItemName] = useState('AK')
  const [itemData, setItemData] = useState(null)

  const fetchCurrencies = () => {
    axios.get('http://127.0.0.1:8000/predict').then(r => {
        const currencies = r.data
        const menuItems = [
          {
            key: 'g1',
            label: 'Список товаров',
            type: 'group',
            children: currencies.map(c => {
            return {label: c.name, key: c.name}
            })
        }]
        setCurrencies(menuItems)
    })
  }

  const fetchItem = () => {
    axios.get(`http://127.0.0.1:8000/predict/${itemName}`).then(r => {
        setItemData(r.data)
    })
  }

  useEffect(() => {
    fetchCurrencies()
  }, []);

  useEffect(() => {
    setItemData(null)
    fetchItem()
  }, [itemName]);

  const onClick = (e) => {
    setItemName(e.key)
  };
  return (
    <div className="flex">
        <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={currencies}
          className="h-screen overflow-scroll"
        />
        <div className="mx-auto my-auto">
            {itemData ? <ItemCard item={itemData}/> : <Spin size="large"/>}
        </div>
    </div>
  );
};
export default App;
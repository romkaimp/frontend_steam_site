import ItemCard from "./components/ItemCard.jsx";
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    key: 'g1',
    label: 'Список товаров',
    type: 'group',
    children: [
      {
        key: '1',
        label: 'Option 1',
      },
      {
        key: '2',
        label: 'Option 2',
      },
    ],
  },

];
const App = () => {

  const fetchCurrensies = () => {
    axios.get('http://127.0.0.1:8000/predict').then(r => {
        console.log("r", r)
    })
    }

  useEffect(() => {
    fetchCurrensies()
  }, []);

  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default App;
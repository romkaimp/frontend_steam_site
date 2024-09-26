import ItemCard from "./components/ItemCard.jsx";
import LoginMenu from "./components/LoginMenu.jsx";
import {useEffect, useState} from 'react';
//import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import axios from "axios";
import { Menu , Spin, Flex, Button, Modal} from 'antd';


const App = () => {
    const addr = 'https://10.0.2.15:8000'
    const [currencies, setCurrencies] = useState([])
    const [itemName, setItemName] = useState('AK')
    const [itemData, setItemData] = useState(null)

    const [loginned, setLoginned] = useState(false)
    const [currentUser, setCurrentUser]= useState("")
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const getCurrentUser = () => {
        axios.get(addr + '/users/me').then(r => {
            const status = r.status
            const user = r.data
            if (status != 401) {
                setCurrentUser(user.email)
                setLoginned(true)
                return currentUser
            } else {
                return false
            }
        })
    }

    const fetchCurrencies = () => {
        axios.get(addr+'/predict').then(r => {
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
        axios.get(addr+`/predict/${itemName}`).then(r => {
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
            <Flex gap="small" justify="end" width="100%" wrap>
                <Button type="primary" onClick={openModal}>{loginned ? currentUser : "login/registry"}</Button>
            </Flex>
            <Modal
                title="Login/registry"
                open={isModalOpen}
                onCancel={() => {
            closeModal();
            getCurrentUser();
        }}
                footer={[
                    <Button key="back" onClick={() => {
            closeModal();
            getCurrentUser();
        }}>
                        Закрыть
                    </Button>,
                ]}>
                <Flex align="center" justify="center">
                    <LoginMenu onClose={getCurrentUser}/>
                </Flex>
            </Modal>
        </div>
  );
};
export default App;

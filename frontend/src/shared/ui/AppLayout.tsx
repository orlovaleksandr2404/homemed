import React from 'react';
import { Layout, Menu, Typography, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  MedicineBoxOutlined,
  HeartOutlined,
  PlusCircleOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { useMedications } from '../../app/MedicationContext';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { demoMode, setDemoMode } = useMedications();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <MedicineBoxOutlined />,
      label: 'Моя аптечка',
    },
    {
      key: '/shelter-list',
      icon: <HeartOutlined />,
      label: 'Отдать в приют',
    },
    {
      key: '/add',
      icon: <PlusCircleOutlined />,
      label: 'Добавить препарат',
    },
    {
      key: '/shelters',
      icon: <ShopOutlined />,
      label: 'Приюты-партнеры',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={4} style={{ color: '#fff', margin: '0 24px 0 0', whiteSpace: 'nowrap' }}>
          HomeMed
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content style={{ padding: '24px 48px', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <div key={location.pathname} className="fade-in-page">
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', color: '#8c8c8c' }}>
        <div>HomeMed.</div>
        <Space size="small" style={{ marginTop: 8, fontSize: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>Режим проверки состояний:</Text>
          <Button
            size="small"
            type={demoMode === 'normal' ? 'primary' : 'default'}
            onClick={() => setDemoMode('normal')}
          >
            Обычный
          </Button>
          <Button
            size="small"
            type={demoMode === 'loading' ? 'primary' : 'default'}
            onClick={() => setDemoMode('loading')}
          >
            Загрузка
          </Button>
          <Button
            size="small"
            type={demoMode === 'error' ? 'primary' : 'default'}
            onClick={() => setDemoMode('error')}
          >
            Ошибка
          </Button>
          <Button
            size="small"
            type={demoMode === 'empty' ? 'primary' : 'default'}
            onClick={() => setDemoMode('empty')}
          >
            Пусто
          </Button>
        </Space>
      </Footer>
    </Layout>
  );
};

import React from 'react';
import { Layout, Menu, Typography, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  MedicineBoxOutlined,
  HeartOutlined,
  PlusCircleOutlined,
  ShopOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { useMedications } from '../../app/MedicationContext';
import { useAuth } from '../../app/AuthContext';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { demoMode, setDemoMode } = useMedications();
  const { user, isAuthenticated, logout } = useAuth();

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
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Title
            level={4}
            style={{ color: '#fff', margin: '0 24px 0 0', whiteSpace: 'nowrap', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
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
        </div>

        <div style={{ marginLeft: 16 }}>
          {isAuthenticated ? (
            <Space>
              <Text style={{ color: '#fff' }}>
                <UserOutlined style={{ marginRight: 6 }} />
                {user?.fullName || user?.email}
              </Text>
              <Button
                type="text"
                danger
                icon={<LogoutOutlined />}
                onClick={() => {
                  logout();
                  navigate('/auth');
                }}
              >
                Выйти
              </Button>
            </Space>
          ) : (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigate('/auth')}
            >
              Войти
            </Button>
          )}
        </div>
      </Header>

      <Content style={{ padding: '24px 48px', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <div key={location.pathname} className="fade-in-page">
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', color: '#8c8c8c' }}>
        <div>HomeMed. Онлайн-контроль домашней аптечки и передача препаратов в приюты.</div>
        <Space size="small" style={{ marginTop: 8, fontSize: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>Режим проверки состояний:</Text>
          <Button size="small" type={demoMode === 'normal' ? 'primary' : 'default'} onClick={() => setDemoMode('normal')}>
            Обычный
          </Button>
          <Button size="small" type={demoMode === 'loading' ? 'primary' : 'default'} onClick={() => setDemoMode('loading')}>
            Загрузка
          </Button>
          <Button size="small" type={demoMode === 'error' ? 'primary' : 'default'} onClick={() => setDemoMode('error')}>
            Ошибка
          </Button>
          <Button size="small" type={demoMode === 'empty' ? 'primary' : 'default'} onClick={() => setDemoMode('empty')}>
            Пусто
          </Button>
        </Space>
      </Footer>
    </Layout>
  );
};

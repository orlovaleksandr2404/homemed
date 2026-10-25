import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Typography, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../app/AuthContext';

const { Title, Text } = Typography;

export const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const onLoginFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await login(values.email, values.password);
      message.success('Вход успешно выполнен!');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const onRegisterFinish = async (values: { email: string; password: string; fullName?: string }) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await register(values.email, values.password, values.fullName);
      message.success('Регистрация прошла успешно!');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '60px auto' }}>
      <Card bordered style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderRadius: 12 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>HomeMed</Title>
          <Text type="secondary">Домашняя аптечка & список в приют</Text>
        </div>

        {errorMsg && (
          <Alert message={errorMsg} type="error" showIcon style={{ marginBottom: 16 }} />
        )}

        <Tabs
          activeKey={activeTab}
          onChange={(k) => {
            setActiveTab(k as 'login' | 'register');
            setErrorMsg(null);
          }}
          centered
          items={[
            {
              key: 'login',
              label: 'Вход',
              children: (
                <Form layout="vertical" onFinish={onLoginFinish} requiredMark={false}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Введите email' },
                      { type: 'email', message: 'Некорректный формат email' },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="user@example.com" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                    Войти в аптечку
                  </Button>
                </Form>
              ),
            },
            {
              key: 'register',
              label: 'Регистрация',
              children: (
                <Form layout="vertical" onFinish={onRegisterFinish} requiredMark={false}>
                  <Form.Item label="Ваше имя" name="fullName">
                    <Input prefix={<UserOutlined />} placeholder="Александр" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Введите email' },
                      { type: 'email', message: 'Некорректный формат email' },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="user@example.com" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                      { required: true, message: 'Придумайте пароль' },
                      { min: 6, message: 'Пароль должен быть от 6 символов' },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Минимум 6 символов" size="large" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                    Создать аккаунт
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

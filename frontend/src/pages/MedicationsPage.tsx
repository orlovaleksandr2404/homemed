import React, { useState } from 'react';
import { Table, Tag, Input, Space, Button, Typography, Card, Row, Col, Statistic } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { mockMedications } from '../mock/mockData';
import type { Medication } from '../types/medication';

const { Title } = Typography;

export const MedicationsPage: React.FC = () => {
  const [data] = useState<Medication[]>(mockMedications);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const renderStatus = (dateStr: string) => {
    const today = dayjs();
    const expiry = dayjs(dateStr);
    const diff = expiry.diff(today, 'day');

    if (diff < 0) {
      return <Tag color="error">Просрочено</Tag>;
    }
    if (diff <= 30) {
      return <Tag color="warning">Истекает ({diff} дн.)</Tag>;
    }
    return <Tag color="success">Годен</Tag>;
  };

  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'Препарат',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row: Medication) => (
        <div>
          <strong>{text}</strong>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{row.dosage}</div>
        </div>
      ),
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Кол-во',
      key: 'qty',
      render: (_: unknown, row: Medication) => `${row.quantity} ${row.unit}`,
    },
    {
      title: 'Срок годности',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (val: string) => (
        <Space>
          <span>{dayjs(val).format('DD.MM.YYYY')}</span>
          {renderStatus(val)}
        </Space>
      ),
      sorter: (a: Medication, b: Medication) => dayjs(a.expiryDate).unix() - dayjs(b.expiryDate).unix(),
    },
    {
      title: 'Условия хранения',
      dataIndex: 'storageConditions',
      key: 'storageConditions',
    },
    {
      title: 'В приют',
      dataIndex: 'donateToShelter',
      key: 'donateToShelter',
      render: (flag: boolean) => (flag ? <Tag color="purple">Да</Tag> : <span style={{ color: '#bfbfbf' }}>Нет</span>),
    },
  ];

  const total = data.length;
  const toShelter = data.filter((d) => d.donateToShelter).length;
  const expired = data.filter((d) => dayjs(d.expiryDate).isBefore(dayjs())).length;

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Всего позиций" value={total} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Для приютов" value={toShelter} valueStyle={{ color: '#722ed1' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Просрочено" value={expired} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>Реестр домашней аптечки</Title>
          <Space>
            <Input
              placeholder="Поиск лекарства..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 260 }}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add')}>
              Добавить
            </Button>
          </Space>
        </div>

        <Table rowKey="id" columns={columns} dataSource={filtered} pagination={{ pageSize: 6 }} />
      </Card>
    </div>
  );
};

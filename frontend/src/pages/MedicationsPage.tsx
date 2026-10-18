import React, { useState } from 'react';
import { Table, Tag, Space, Button, Typography, Card, Row, Col, Statistic, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useMedications } from '../app/MedicationContext';
import type { Medication } from '../entities/medication/types';
import { ExpiryStatusTag } from '../entities/medication/ExpiryStatusTag';
import { MedicationFilter } from '../features/medication-filter/MedicationFilter';
import { DataStateBlock } from '../shared/ui/DataStateBlock';

const { Title } = Typography;

export const MedicationsPage: React.FC = () => {
  const { medications, demoMode, setDemoMode, toggleShelterFlag, deleteMedication } = useMedications();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const filtered = medications.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleToggleShelter = (row: Medication) => {
    if (!row.donateToShelter && dayjs(row.expiryDate).isBefore(dayjs().startOf('day'))) {
      message.warning('Просроченный препарат нельзя передать в приют');
      return;
    }
    toggleShelterFlag(row.id);
    message.info(
      !row.donateToShelter
        ? `«${row.name}» отмечен для передачи в приют`
        : `«${row.name}» убран из списка для приюта`
    );
  };

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
          <ExpiryStatusTag expiryDate={val} />
        </Space>
      ),
      sorter: (a: Medication, b: Medication) =>
        dayjs(a.expiryDate).unix() - dayjs(b.expiryDate).unix(),
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
      render: (flag: boolean, row: Medication) => (
        <span onClick={() => handleToggleShelter(row)} style={{ cursor: 'pointer' }} title="Нажмите, чтобы переключить">
          {flag ? (
            <Tag color="purple">Да</Tag>
          ) : (
            <Tag style={{ color: '#8c8c8c' }}>Нет</Tag>
          )}
        </span>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      render: (_: unknown, row: Medication) => (
        <Popconfirm
          title="Удалить препарат из аптечки?"
          onConfirm={() => {
            deleteMedication(row.id);
            message.success(`«${row.name}» удален`);
          }}
          okText="Да"
          cancelText="Нет"
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ];

  const total = medications.length;
  const toShelter = medications.filter((d) => d.donateToShelter).length;
  const expired = medications.filter((d) => dayjs(d.expiryDate).isBefore(dayjs())).length;

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
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>Реестр домашней аптечки</Title>
          <MedicationFilter
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            onAddClick={() => navigate('/add')}
          />
        </div>

        <DataStateBlock
          loading={demoMode === 'loading'}
          error={demoMode === 'error' ? 'Не удалось загрузить реестр препаратов.' : null}
          isEmpty={filtered.length === 0}
          emptyText="Препараты не найдены."
          onRetry={() => setDemoMode('normal')}
        >
          <Table rowKey="id" columns={columns} dataSource={filtered} pagination={{ pageSize: 6 }} />
        </DataStateBlock>
      </Card>
    </div>
  );
};

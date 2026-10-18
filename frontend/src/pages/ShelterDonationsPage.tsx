import React from 'react';
import { Card, Table, Tag, Button, Typography, Alert, message, Modal } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useMedications } from '../app/MedicationContext';
import type { Medication } from '../entities/medication/types';
import { DataStateBlock } from '../shared/ui/DataStateBlock';

const { Title, Paragraph } = Typography;

export const ShelterDonationsPage: React.FC = () => {
  const { medications, donateMedication, demoMode, setDemoMode } = useMedications();

  const list = medications.filter(
    (m) => m.donateToShelter && dayjs(m.expiryDate).isAfter(dayjs())
  );

  const handleDonate = (med: Medication) => {
    Modal.confirm({
      title: 'Подтверждение передачи',
      content: `Передать препарат «${med.name}» волонтерам приюта? Позиция будет списана из домашней аптечки.`,
      okText: 'Передать',
      cancelText: 'Отмена',
      onOk: () => {
        donateMedication(med.id);
        message.success(`«${med.name}» передан в приют!`);
      },
    });
  };

  const columns = [
    {
      title: 'Наименование для приюта',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row: Medication) => (
        <div>
          <strong>{text}</strong>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{row.category} ({row.dosage})</div>
        </div>
      ),
    },
    {
      title: 'Количество',
      key: 'quantity',
      render: (_: unknown, row: Medication) => `${row.quantity} ${row.unit}`,
    },
    {
      title: 'Срок годности',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (val: string) => (
        <span>
          {dayjs(val).format('DD.MM.YYYY')} <Tag color="green">Срок в норме</Tag>
        </span>
      ),
    },
    {
      title: 'Действие',
      key: 'action',
      render: (_: unknown, row: Medication) => (
        <Button
          type="primary"
          icon={<HeartOutlined />}
          style={{ background: '#722ed1', borderColor: '#722ed1' }}
          onClick={() => handleDonate(row)}
        >
          Отдать в приют
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <Title level={3}>Препараты для передачи в приюты животных</Title>
        <Paragraph type="secondary">
          Список сформирован из медикаментов домашней аптечки, у которых ещё не закончился срок годности
          и для которых выставлен флаг благотворительности.
        </Paragraph>
        <Alert
          message="Требования к пожертвованиям"
          description="Приюты принимают только непросроченные лекарства в целой фабричной упаковке или с нормальным остаточным сроком."
          type="info"
          showIcon
        />
      </Card>

      <Card>
        <DataStateBlock
          loading={demoMode === 'loading'}
          error={demoMode === 'error' ? 'Ошибка загрузки списка пожертвований.' : null}
          isEmpty={list.length === 0}
          emptyText="Нет лекарств, готовых к передаче."
          onRetry={() => setDemoMode('normal')}
        >
          <Table
            rowKey="id"
            columns={columns}
            dataSource={list}
            locale={{ emptyText: 'Нет лекарств, готовых к передаче.' }}
          />
        </DataStateBlock>
      </Card>
    </div>
  );
};

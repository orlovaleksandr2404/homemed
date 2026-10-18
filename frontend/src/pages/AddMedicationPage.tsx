import React from 'react';
import { Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMedications } from '../app/MedicationContext';
import { MedicationForm } from '../features/medication-form/MedicationForm';
import type { MedicationFormValues } from '../entities/medication/types';

const { Title } = Typography;

export const AddMedicationPage: React.FC = () => {
  const navigate = useNavigate();
  const { addMedication } = useMedications();

  const handleCreate = (values: MedicationFormValues) => {
    addMedication(values);
    message.success('Препарат успешно добавлен в список!');
    navigate('/');
  };

  return (
    <Card style={{ maxWidth: 640, margin: '0 auto' }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Добавить медикамент
      </Title>

      <MedicationForm onSubmit={handleCreate} />
    </Card>
  );
};

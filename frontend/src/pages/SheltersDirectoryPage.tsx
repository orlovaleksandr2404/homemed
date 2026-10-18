import React, { useState } from 'react';
import { Card, Row, Col, Typography, Select } from 'antd';
import { useMedications } from '../app/MedicationContext';
import { ShelterCard } from '../entities/shelter/ShelterCard';
import { DataStateBlock } from '../shared/ui/DataStateBlock';

const { Title, Paragraph } = Typography;

export const SheltersDirectoryPage: React.FC = () => {
  const { shelters, demoMode, setDemoMode } = useMedications();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allCategories = Array.from(
    new Set(shelters.flatMap((s) => s.neededCategories))
  );

  const filteredShelters =
    selectedCategory === 'all'
      ? shelters
      : shelters.filter((s) => s.neededCategories.includes(selectedCategory));

  return (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <Title level={3} style={{ marginTop: 0 }}>Партнерские приюты</Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Организации, которые принимают перевязочные материалы, растворы и ветеринарные препараты от населения.
            </Paragraph>
          </div>
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ width: 240 }}
            options={[
              { value: 'all', label: 'Все нужды приютов' },
              ...allCategories.map((c) => ({ value: c, label: c })),
            ]}
          />
        </div>
      </Card>

      <DataStateBlock
        loading={demoMode === 'loading'}
        error={demoMode === 'error' ? 'Не удалось загрузить справочник приютов.' : null}
        isEmpty={filteredShelters.length === 0}
        emptyText="Приюты по выбранной категории не найдены."
        onRetry={() => setDemoMode('normal')}
      >
        <Row gutter={[16, 16]}>
          {filteredShelters.map((shelter) => (
            <Col xs={24} md={12} key={shelter.id}>
              <ShelterCard shelter={shelter} />
            </Col>
          ))}
        </Row>
      </DataStateBlock>
    </div>
  );
};

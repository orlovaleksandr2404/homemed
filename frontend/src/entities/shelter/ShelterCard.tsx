import React from 'react';
import { Card, Typography, Tag, Space } from 'antd';
import { EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import type { Shelter } from './types';

const { Text } = Typography;

interface ShelterCardProps {
  shelter: Shelter;
}

export const ShelterCard: React.FC<ShelterCardProps> = ({ shelter }) => {
  return (
    <Card title={shelter.name} hoverable className="fade-in-item">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <Text>{shelter.address}</Text>
        </div>
        <div>
          <PhoneOutlined style={{ marginRight: 8, color: '#52c41a' }} />
          <Text>{shelter.phone}</Text>
        </div>

        <div style={{ marginTop: 12 }}>
          <Text strong>Нуждаются в категориях:</Text>
          <div style={{ marginTop: 6 }}>
            {shelter.neededCategories.map((cat) => (
              <Tag color="blue" key={cat} style={{ marginBottom: 4 }}>
                {cat}
              </Tag>
            ))}
          </div>
        </div>
      </Space>
    </Card>
  );
};

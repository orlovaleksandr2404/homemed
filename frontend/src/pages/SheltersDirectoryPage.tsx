import React from 'react';
import { Card, Row, Col, Typography, Tag, Space } from 'antd';
import { EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import { mockShelters } from '../mock/mockData';

const { Title, Paragraph, Text } = Typography;

export const SheltersDirectoryPage: React.FC = () => {
  return (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <Title level={3}>Партнерские приюты</Title>
        <Paragraph type="secondary">
          Организации, которые принимают перевязочные материалы, растворы и ветеринарные препараты от населения.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]}>
        {mockShelters.map((shelter) => (
          <Col xs={24} md={12} key={shelter.id}>
            <Card title={shelter.name} hoverable>
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
          </Col>
        ))}
      </Row>
    </div>
  );
};

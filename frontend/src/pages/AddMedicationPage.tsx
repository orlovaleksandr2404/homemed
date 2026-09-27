import React from 'react';
import { Card, Form, Input, InputNumber, Select, DatePicker, Checkbox, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

export const AddMedicationPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    // В Лр1 сохраняем визуально и переходим на главную[cite: 2]
    message.success('Препарат успешно добавлен в список!');
    navigate('/');
  };

  return (
    <Card style={{ maxWidth: 640, margin: '0 auto' }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Добавить медикамент
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ unit: 'уп', storageConditions: 'Комнатная температура', donateToShelter: false }}
      >
        <Form.Item
          label="Название препарата"
          name="name"
          rules={[{ required: true, message: 'Укажите название' }]}
        >
          <Input placeholder="Например: Хлоргексидин или Парацетамол" />
        </Form.Item>

        <Form.Item
          label="Категория"
          name="category"
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select placeholder="Выберите категорию">
            <Option value="Антисептики">Антисептики</Option>
            <Option value="Перевязочные материалы">Перевязочные материалы</Option>
            <Option value="Антибиотики">Антибиотики</Option>
            <Option value="Обезболивающие">Обезболивающие</Option>
            <Option value="Растворы">Растворы</Option>
            <Option value="Прочее">Прочее</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Форма выпуска / дозировка" name="dosage">
          <Input placeholder="Например: 500 мг, 10 ампул или 100 мл" />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            label="Количество"
            name="quantity"
            rules={[{ required: true, message: 'Введите количество' }]}
            style={{ flex: 1 }}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Ед. изм." name="unit" style={{ width: 110 }}>
            <Select>
              <Option value="уп">уп</Option>
              <Option value="шт">шт</Option>
              <Option value="фл">фл</Option>
              <Option value="амп">амп</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="Срок годности"
          name="expiryDate"
          rules={[{ required: true, message: 'Выберите дату окончания срока годности' }]}
        >
          <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
        </Form.Item>

        <Form.Item label="Условия хранения" name="storageConditions">
          <Select>
            <Option value="Комнатная температура">Комнатная температура (15-25°C)</Option>
            <Option value="Холодильник (2-8°C)">Холодильник (2-8°C)</Option>
            <Option value="Сухое и темное место">Сухое и темное место</Option>
          </Select>
        </Form.Item>

        <Form.Item name="donateToShelter" valuePropName="checked">
          <Checkbox>Готов отдать остаток в приют до истечения срока</Checkbox>
        </Form.Item>

        <Form.Item label="Примечание" name="notes">
          <Input.TextArea rows={2} placeholder="Номер полки или дата вскрытия" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Сохранить в аптечку
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

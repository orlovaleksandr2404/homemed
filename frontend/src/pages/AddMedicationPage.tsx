import React from 'react';
import { Card, Form, Input, InputNumber, Select, DatePicker, Checkbox, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export const AddMedicationPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = () => {
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
          <Select
            placeholder="Выберите категорию"
            options={[
              { value: 'Антисептики', label: 'Антисептики' },
              { value: 'Перевязочные материалы', label: 'Перевязочные материалы' },
              { value: 'Антибиотики', label: 'Антибиотики' },
              { value: 'Обезболивающие', label: 'Обезболивающие' },
              { value: 'Растворы', label: 'Растворы' },
              { value: 'Прочее', label: 'Прочее' },
            ]}
          />
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
            <Select
              options={[
                { value: 'уп', label: 'уп' },
                { value: 'шт', label: 'шт' },
                { value: 'фл', label: 'фл' },
                { value: 'амп', label: 'амп' },
              ]}
            />
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
          <Select
            options={[
              { value: 'Комнатная температура', label: 'Комнатная температура (15-25°C)' },
              { value: 'Холодильник (2-8°C)', label: 'Холодильник (2-8°C)' },
              { value: 'Сухое и темное место', label: 'Сухое и темное место' },
            ]}
          />
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

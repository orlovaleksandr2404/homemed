import React from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Checkbox, Button } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import type { MedicationFormValues } from '../../entities/medication/types';

interface RawFormValues {
  name: string;
  category: string;
  dosage: string;
  quantity: number;
  unit: string;
  expiryDate: Dayjs;
  storageConditions: string;
  donateToShelter: boolean;
  notes?: string;
}

interface MedicationFormProps {
  onSubmit: (values: MedicationFormValues) => void;
}

export const MedicationForm: React.FC<MedicationFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm<RawFormValues>();

  const handleFinish = (values: RawFormValues) => {
    onSubmit({
      name: values.name.trim(),
      category: values.category,
      dosage: values.dosage.trim(),
      quantity: values.quantity,
      unit: values.unit,
      expiryDate: values.expiryDate.format('YYYY-MM-DD'),
      storageConditions: values.storageConditions,
      donateToShelter: Boolean(values.donateToShelter),
      notes: values.notes?.trim() || undefined,
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        unit: 'уп',
        storageConditions: 'Комнатная температура',
        donateToShelter: false,
      }}
    >
      <Form.Item
        label="Название препарата"
        name="name"
        rules={[
          { required: true, message: 'Укажите название препарата' },
          { min: 2, message: 'Название должно содержать минимум 2 символа' },
        ]}
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
            { value: 'Спазмолитики', label: 'Спазмолитики' },
            { value: 'Растворы', label: 'Растворы' },
            { value: 'Прочее', label: 'Прочее' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Форма выпуска / дозировка"
        name="dosage"
        rules={[{ required: true, message: 'Укажите дозировку или форму выпуска' }]}
      >
        <Input placeholder="Например: 500 мг, 10 ампул или 100 мл" />
      </Form.Item>

      <div style={{ display: 'flex', gap: 16 }}>
        <Form.Item
          label="Количество"
          name="quantity"
          rules={[
            { required: true, message: 'Введите количество' },
            { type: 'number', min: 1, max: 1000, message: 'Допустимо от 1 до 1000' },
          ]}
          style={{ flex: 1 }}
        >
          <InputNumber min={1} max={1000} style={{ width: '100%' }} />
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

      <Form.Item
        name="donateToShelter"
        valuePropName="checked"
        dependencies={['expiryDate']}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value: boolean) {
              const expiryDate: Dayjs | undefined = getFieldValue('expiryDate');
              if (value && expiryDate && expiryDate.isBefore(dayjs().startOf('day'))) {
                return Promise.reject(
                  new Error('Просроченный препарат нельзя передать в приют!')
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
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
  );
};

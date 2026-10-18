import React from 'react';
import { Input, Select, Space, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

interface MedicationFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  onAddClick: () => void;
}

export const MedicationFilter: React.FC<MedicationFilterProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  onAddClick,
}) => {
  return (
    <Space wrap>
      <Select
        value={category}
        onChange={onCategoryChange}
        style={{ width: 200 }}
        options={[
          { value: 'all', label: 'Все категории' },
          { value: 'Антисептики', label: 'Антисептики' },
          { value: 'Перевязочные материалы', label: 'Перевязочные материалы' },
          { value: 'Антибиотики', label: 'Антибиотики' },
          { value: 'Обезболивающие', label: 'Обезболивающие' },
          { value: 'Спазмолитики', label: 'Спазмолитики' },
          { value: 'Растворы', label: 'Растворы' },
          { value: 'Прочее', label: 'Прочее' },
        ]}
      />
      <Input
        placeholder="Поиск лекарства..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        allowClear
        style={{ width: 260 }}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddClick}>
        Добавить
      </Button>
    </Space>
  );
};

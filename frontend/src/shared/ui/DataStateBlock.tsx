import React from 'react';
import { Spin, Result, Empty, Button } from 'antd';

interface DataStateBlockProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyText?: string;
  onRetry?: () => void;
  children: React.ReactNode;
}

export const DataStateBlock: React.FC<DataStateBlockProps> = ({
  loading,
  error,
  isEmpty,
  emptyText = 'Данные отсутствуют',
  onRetry,
  children,
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }} className="fade-in-page">
        <Spin size="large" tip="Загрузка данных..." />
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Ошибка загрузки данных"
        subTitle={error}
        extra={
          onRetry && (
            <Button type="primary" onClick={onRetry}>
              Повторить попытку
            </Button>
          )
        }
      />
    );
  }

  if (isEmpty) {
    return (
      <div style={{ padding: '32px 0' }} className="fade-in-page">
        <Empty description={emptyText} />
      </div>
    );
  }

  return <>{children}</>;
};

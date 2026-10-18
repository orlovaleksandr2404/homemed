import React from 'react';
import { Tag } from 'antd';
import dayjs from 'dayjs';

interface ExpiryStatusTagProps {
  expiryDate: string;
}

export const ExpiryStatusTag: React.FC<ExpiryStatusTagProps> = ({ expiryDate }) => {
  const today = dayjs().startOf('day');
  const expiry = dayjs(expiryDate).startOf('day');
  const diff = expiry.diff(today, 'day');

  if (diff < 0) {
    return <Tag color="error">Просрочено</Tag>;
  }
  if (diff <= 30) {
    return <Tag color="warning">Истекает ({diff} дн.)</Tag>;
  }
  return <Tag color="success">Годен</Tag>;
};

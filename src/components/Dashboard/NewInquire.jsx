import React from 'react';
import { Table, Avatar } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export const NewInquire = () => {
  // Sample Data
  const data = [
    {
      key: '1',
      sno: '#12333',
      name: { avatar: 'https://i.pravatar.cc/150?img=1', text: 'dindiniya' },
      email: 'bockelboy@att.com',
      contact: '(201) 555-0124',
      serviceName: 'Kent, Utah',
      location: 'Kent, Utah',
    },
    {
      key: '2',
      sno: '#12333',
      name: { avatar: 'https://i.pravatar.cc/150?img=2', text: 'Halima' },
      email: 'csilvers@verizon.com',
      contact: '(219) 555-0114',
      serviceName: 'Great Falls, Maryland',
      location: 'Great Falls, Maryland',
    },
    {
      key: '3',
      sno: '#12333',
      name: { avatar: 'https://i.pravatar.cc/150?img=3', text: 'Foysal Rahman' },
      email: 'qamaho@mail.com',
      contact: '(316) 555-0116',
      serviceName: 'Lansing, Illinois',
      location: 'Lansing, Illinois',
    },
    {
      key: '4',
      sno: '#12333',
      name: { avatar: 'https://i.pravatar.cc/150?img=4', text: 'Hari Danang' },
      email: 'xterris@gmail.com',
      contact: '(907) 555-0101',
      serviceName: 'Lafayette, California',
      location: 'Lafayette, California',
    },
  ];

  // Table Columns
  const columns = [
    {
      title: 'S no.',
      dataIndex: 'sno',
      key: 'sno',
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <div className="flex items-center">
          <Avatar src={name.avatar} alt={name.text} />
          <span style={{ marginLeft: 8 }}>{name.text}</span>
        </div>
      ),
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact',
      key: 'contact',
      width: '15%',
    },
    {
      title: 'Services Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
      width: '15%',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: '15%',
    },
    {
      title: 'View',
      key: 'view',
      render: () => (
        <EyeOutlined style={{ fontSize: '16px', color: '#1E3F66', cursor: 'pointer' }} />
      ),
      width: '5%',
    },
  ];

  return (
    <div>
      <h2 className='text-xl font-medium pt-3 pl-6'>New Inquire</h2>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

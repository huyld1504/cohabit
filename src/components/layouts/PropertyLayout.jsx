import { Layout } from 'antd';
import React from 'react'
import { Header } from '../common';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const PropertyLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default PropertyLayout
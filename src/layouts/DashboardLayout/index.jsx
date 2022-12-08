import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Drawer } from 'antd';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default ({ children }) => {
  const [visible, setVisible] = useState(false);

  const { pathname } = useLocation();

  return (
    <Layout className={`layout-dashboard`}>
      <Drawer
        title={false}
        placement={'left'}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={'left'}
        width={250}
        className={`drawer-sidebar`}
      >
        <Layout className={`layout-dashboard`}>
          <Layout.Sider
            trigger={null}
            width={250}
            theme="dark"
            className={`sider-primary ant-layout-sider-primary`}
            style={{ backgroundColor: '#141414' }}
          >
            <Sidebar pathname={pathname} />
          </Layout.Sider>
        </Layout>
      </Drawer>
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={250}
        theme="dark"
        className={`sider-primary ant-layout-sider-primary`}
        style={{ backgroundColor: '#141414' }}
      >
        <Sidebar pathname={pathname} />
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Header
            onPress={() => setVisible(true)}
            pathname={pathname}
          />
        </Layout.Header>
        <Layout.Content className="content-ant">
          {children}
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

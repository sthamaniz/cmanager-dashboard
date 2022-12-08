import { Layout } from 'antd';

export default ({ children }) => {
  return (
    <Layout className="layout-default layout-signin">
      <Layout.Header>
        <div className="header-col header-brand">
          <h5>Dashboard</h5>
        </div>
      </Layout.Header>
      <Layout.Content className="signin">{children}</Layout.Content>
    </Layout>
  );
};

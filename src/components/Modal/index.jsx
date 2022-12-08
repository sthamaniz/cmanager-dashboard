import { Modal, Button } from 'antd';

import './styles.scss';

export default ({
  isModalVisible,
  title,
  body,
  handleOK,
  loading,
  handleCancel,
}) => {
  return (
    <div className="modal">
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOK}
        onCancel={handleCancel}
        footer={[
          <Button
            key="Cancel"
            disabled={loading}
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="Proceed"
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={handleOK}
          >
            Proceed
          </Button>,
        ]}
      >
        {body}
      </Modal>
    </div>
  );
};

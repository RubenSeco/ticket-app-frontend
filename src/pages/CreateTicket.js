import React, { useContext, useState } from 'react';
import { Button, Col, Row, Typography } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const CreateTicket = () => {


  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const newTicket = () => {

    socket.emit('newTicket', null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>Create Ticket</Title>
          <Button
            type="primary"
            shape='round'
            size='large'
            icon={<DownloadOutlined />}
            onClick={newTicket}>
            New Ticket
          </Button>

        </Col>
      </Row>
      {
        ticket && (
          <Row style={{ marginTop: 100 }}>
            <Col span={14} offset={6} align="center">
              <Text level={2}>
                Your number
              </Text>
              <br />
              <Text type='success' style={{ fontSize: 55 }}>
                {ticket.number}
              </Text>

            </Col>
          </Row>
        )
      }
    </>
  );
};

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

import { Button, Col, Divider, Row, Typography } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';

import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;


export const Desktop = () => {

  const navegate = useNavigate();
  const [user] = useState(getUserStorage());
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);


  const logout = () => {
    localStorage.removeItem('agent');
    localStorage.removeItem('desktop');
    navegate('/login');
  };


  const nextTicket = () => {
    socket.emit('next-ticket', user, (ticket) => {
      setTicket(ticket);
    });
  };

  useHideMenu(false);


  if (!user.agent || !user.desktop) {
    return navegate('/login');
  }



  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agent}</Title>
          <Text>You are working in the desktop number:  </Text>
          <Text type='success' style={{ fontSize: 20 }}>{user.desktop}</Text>
        </Col>

        <Col span={4} align="right">
          <Button shape="round" type="primary" danger onClick={logout}>
            <CloseCircleOutlined />
            Logout
          </Button>
        </Col>

      </Row>

      <Divider />

      {
        ticket && (

          <Row>
            <Col>
              <Text>You are attending to ticket number: </Text>
              <Text style={{ fontSize: 30 }} type="danger">{ticket.number}</Text>
            </Col>
          </Row>


        )

      }

      <Row>
        <Col offset={18} span={6} align="right">
          <Button shape="round" type="primary" onClick={nextTicket}>
            <RightOutlined />
            Next Ticket
          </Button>
        </Col>
      </Row>



    </>
  );

};
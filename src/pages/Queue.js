import React, { useContext, useEffect, useState } from 'react'

import { Typography, Row, Col, List, Card, Tag, Divider } from "antd"
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getLasts } from '../helpers/getLasts';

const { Title, Text } = Typography;


export const Queue = () => {

  useHideMenu(true);
  
  const { socket } = useContext(SocketContext);
  
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
  socket.on('ticket-assigned', (assigned) => {
    setTickets(assigned);
  });
    
  return () => {
    socket.off('ticket-assigned');
  } 
  
  }, [socket]);
  

  useEffect(() => {
    getLasts().then(tickets => setTickets(tickets));
  }, []);

  return (
    <>
      <Title level={1}>Attending to the client</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => <List.Item>
              <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[<Tag color="green">{item.agent}</Tag>,
                          <Tag color="blue">Desktop: {item.desktop}</Tag>]}
              >
                <Title level={4}>Ticket number: { item.number}</Title>
              </Card>
            </List.Item>}
          >

          </List>
        </Col>
        <Col span={12}>
          <Divider>Record</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item.Meta
                title={`Ticket number: ${item.number}`}
                description={
                  <>
                    <Text type="secondary">Desktop: </Text>
                    <Tag color="magenta">{ item.desktop}</Tag>
                    <Text type="secondary">Agent: </Text>
                    <Tag color="volcano">{ item.agent}</Tag>
                  </>
                }
              >
              </List.Item.Meta>
            )}
          ></List>
        </Col>
      </Row>
     
    </>
  )
}

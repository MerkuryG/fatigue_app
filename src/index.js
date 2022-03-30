import React from 'react';
import ReactDOM from 'react-dom';
import { Divider, Card, Button, InputNumber, Menu, Row, Avatar, Col, Modal, Rate } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, LineChartOutlined, AppstoreOutlined, FrownOutlined, MehOutlined,SmileOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Meta } = Card;



export default class App extends React.Component {
  state = {
    current: 'one',
    coffeeCount: 0,
    waterCount: 0,
    alcoholCount: 0,
    sleepVisible: 0,
    fatigueVisible: 0,
    rateValue: 3,
    rateValueFatigue: 3,
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  onClickPlus(value, type) {
    console.log(value, type)
    type === 'coffee intake' ?
      this.setState({ coffeeCount: value + 1 }) :
      type === 'water intake' ?
        this.setState({ waterCount: value + 1 }) :
        this.setState({ alcoholCount: value + 1 })
  }

  onClickMinus(value, type) {
    console.log(value, type)
    type === 'coffee intake' && value > 0 ?
      this.setState({ coffeeCount: value - 1 }) :
      type === 'water intake' && value > 0 ?
        this.setState({ waterCount: value - 1 }) :
        type === 'alcohol intake' && value > 0 ?
          this.setState({ alcoholCount: value - 1 }) :
          console.log('test')
  }

  onRateSleep() {
    this.setState({ sleepVisible: 1 })
  }

  onRateFatigue() {
    this.setState({ fatigueVisible: 1 })
  }

  handleChangeSleepRating(val) {
    this.setState({ rateValue: val })
  }

  handleChangeFatigueRating(val) {
    this.setState({ rateValueFatigue: val })
  }

  

  Item(details) {
    return (
      <div>
        <Card
          style={{ width: 300 }}

          actions={[
            <Button type="primary"
              shape="circle"
              icon={<PlusCircleOutlined />}
              onClick={this.onClickPlus.bind(this, details.value, details.title)} />,

            <Button
              type="primary"
              shape="circle"
              icon={<MinusCircleOutlined />}
              onClick={this.onClickMinus.bind(this, details.value, details.title)} />,

            <InputNumber
              size="large"
              prefix={details.prefix}
              value={details.value}
              min={0} />,
          ]}>
          <Meta

            avatar={<Avatar src={details.source} />}
            title={details.title}
            description={details.description}
          />
        </Card>
      </div>
    )
  }


  render() {
    const current = this.state.current;
    let desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']
    const customIcons = {
      1: <FrownOutlined />,
      2: <FrownOutlined />,
      3: <MehOutlined />,
      4: <SmileOutlined />,
      5: <SmileOutlined />,
    };

    return (
      <div className="site-card-wrapper">

        <Menu selectedKeys={[current]} onClick={this.handleClick} mode="horizontal">
          <Menu.Item key="one" icon={<AppstoreOutlined />}>
            Main
          </Menu.Item>
          <Menu.Item key="two" icon={<LineChartOutlined />}>
            Overview
          </Menu.Item>
        </Menu>

        {current === 'one' ?
          <div>
            <Row gutter={[16, 16]} justify="space-around">
              <Col span={6} >


                {this.Item(
                  {
                    source: "https://github.com/MerkuryG/fatigue_app/blob/main/590836.png?raw=true",
                    title: "coffee intake",
                    prefix: "cups",
                    description: "This is the coffee description",
                    value: this.state.coffeeCount
                  }
                )}

              </Col>

              <Col span={6}  >


                {this.Item(
                  {
                    source: "https://github.com/MerkuryG/fatigue_app/blob/main/3717054.png?raw=true",
                    title: "water intake",
                    prefix: "glasses",
                    description: "This is the water description",
                    value: this.state.waterCount
                  }
                )}

              </Col>

              <Col span={6} >

                {this.Item(
                  {
                    source: "https://github.com/MerkuryG/fatigue_app/blob/main/920523.png?raw=true",
                    title: "alcohol intake",
                    prefix: "units",
                    description: "This is the alcohol description",
                    value: this.state.alcoholCount
                  }
                )}

              </Col>

              <Col span={6}>

                <Card
                  style={{ width: 300 }}

                  actions={[
                    <Button type="primary" onClick={this.onRateSleep.bind(this)}>
                      Rate your sleep </Button>,
                  ]}>
                  <Meta

                    avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/sleep.png" />}
                    title='Sleep data'
                    description='sleep description'
                  />
                </Card>

              </Col>

              <Col span={6} >

                  <Card
                    style={{ width: 300 }}

                    actions={[
                      <Button type="primary" onClick={this.onRateFatigue.bind(this)}>
                        Rate your fatigue </Button>,
                    ]}>
                    <Meta

                      avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/fatigue.png" />}
                      title='fatigue data'
                      description='fatigue description'
                    />
                  </Card>

                </Col>

            </Row>

          </div>

          :
          <Row gutter={16}>
            <Card>
              <h1>page 2</h1>
              <Divider />
            </Card>
          </Row>

        }


        <Modal title="Basic Modal"
          visible={this.state.sleepVisible}
          onOk={() => this.setState({ sleepVisible: 0 })}
          onCancel={() => this.setState({ sleepVisible: 0 })}>
          <span>
            <Rate tooltips={desc} 
            onChange={this.handleChangeSleepRating.bind(this)} 
            value={this.state.rateValue} />
            {this.state.rateValue ? <span className="ant-rate-text">{desc[this.state.rateValue - 1]}</span> : ''}
          </span>
          
        </Modal>

        <Modal title="Basic Modal"
          visible={this.state.fatigueVisible}
          onOk={() => this.setState({ fatigueVisible: 0 })}
          onCancel={() => this.setState({ fatigueVisible: 0 })}>
          <Rate onChange={this.handleChangeFatigueRating.bind(this)} 
          value={this.state.rateValueFatigue} 
          character={({ index }) => customIcons[index + 1]} 
          />

        </Modal>

        
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


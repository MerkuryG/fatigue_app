import React from 'react';
import ReactDOM from 'react-dom';
import { Space, Card, Button, InputNumber, Menu, Row, Avatar, Col, Modal, Rate, Form, Input, Switch } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, LineChartOutlined, AppstoreOutlined, FrownOutlined, MehOutlined, SmileOutlined, FireOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import EChartsReact from 'echarts-for-react';

const { Meta } = Card;

let separator = '/'
let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

export default class App extends React.Component {
  state = {
    current: 'one',
    hadBreakfast:0,
    coffeeCount: 0,
    waterCount: 0,
    alcoholCount: 0,
    sleepVisible: 0,
    fatigueVisible: 0,
    excerciseVisible: 0,
    workVisible:0,
    rateValue: 3,
    rateValueFatigue: 2,
    rateExcerciseIntensity: 2,
    hoursSleep: 0,
    hoursExcercise: 0,
    hoursWork:0,
    date: `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
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

  onAddExcercise() {
    this.setState({ excerciseVisible: 1 })
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
      2: <MehOutlined />,
      3: <SmileOutlined />,
    };

    const customExcerciseIcons = {
      1: <FireOutlined />,
      2: <FireOutlined />,
      3: <FireOutlined />,
      4: <FireOutlined/>,
      5: <FireOutlined/>,
    }

    let option = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Water intake', 'Coffee intake', 'Alcohol intake', 'Sleep rating', 'Fatigue rating']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Water intake',
          type: 'line',
          stack: 'Total',
          data: [10, 12, 11, 8, 15, 13, 12]
        },
        {
          name: 'Coffee intake',
          type: 'line',
          stack: 'Total',
          data: [2, 1, 3, 2, 0, 1, 2]
        },
        {
          name: 'Alcohol intake',
          type: 'line',
          stack: 'Total',
          data: [0, 2, 0, 0, 5, 0, 1]
        },
        {
          name: 'Sleep rating',
          type: 'line',
          stack: 'Total',
          data: [3, 4, 3, 5, 2, 1, 4]
        },
        {
          name: 'Fatigue rating',
          type: 'line',
          stack: 'Total',
          data: [3, 2, 4, 1, 3, 4, 5]
        }
      ]
    }

    let option2 = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    };

    console.log(this.state.hadBreakfast)

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
            <Row gutter={[16, 16]} justify="space-around" align="middle">
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

              <Col span={6}>

                <Card
                  style={{ width: 300 }}

                  actions={[
                    <Button type="primary" onClick={()=>{this.setState({workVisible: 1})}}>
                      Register your work </Button>,
                  ]}>
                  <Meta

                    avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/work.png" />}
                    title='Work data'
                    description='work description'
                  />
                </Card>

              </Col>

              <Col span={6} >

                <Card
                  style={{ width: 300 }}

                  actions={[
                    <Button type="primary" onClick={this.onAddExcercise.bind(this)}>
                      Add excercise </Button>,
                  ]}>
                  <Meta

                    avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/excercise.png" />}
                    title='Excercise data'
                    description='Excercise description'
                  />
                </Card>

              </Col>

              <Col span={6} >

                <Card
                  style={{ width: 300 }}

                  actions={[
                    <Switch onChange={(checked)=>this.setState({hadBreakfast : checked})} />,
                  ]}>
                  <Meta

                    avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/breakfast.png" />}
                    title='Breakfast'
                    description='Breakfast description'
                  />
                </Card>

              </Col>

              <Col span={6} >

                <Card
                  style={{ width: 300 }}

                  actions={[
                  ]}>
                  <Meta

                    avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/stress.png" />}
                    title='Stress'
                    description='stress description'
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
          <Card>
            <EChartsReact option={option} notMerge={true} />
            <EChartsReact option={option2} notMerge={true} />
          </Card>


        }


        <Modal title="Sleep"
          visible={this.state.sleepVisible}
          onOk={() => this.setState({ sleepVisible: 0 })}
          onCancel={() => this.setState({ sleepVisible: 0 })}>

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >

            <Form.Item
              label="Hours of sleep"
            >

              <InputNumber
                onChange={(value) => this.setState({ hoursSleep: value })} />

            </Form.Item>

            <Form.Item
              label="Rate your sleep"
            >

              <Rate tooltips={desc}
                onChange={this.handleChangeSleepRating.bind(this)}
                value={this.state.rateValue} allowHalf />


            </Form.Item>

          </Form>

        </Modal>

        <Modal title="Fatigue"
          visible={this.state.fatigueVisible}
          onOk={() => this.setState({ fatigueVisible: 0 })}
          onCancel={() => this.setState({ fatigueVisible: 0 })}>

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >

            <Form.Item
              label="Rate your tiredness:"
            >

              <Rate onChange={this.handleChangeFatigueRating.bind(this)}
                value={this.state.rateValueFatigue}
                character={({ index }) => customIcons[index + 1]} allowHalf
              />

            </Form.Item>

            <Form.Item
              label="Add a comment:"
            >
              <Input.TextArea />

            </Form.Item>

          </Form>

        </Modal>

        <Modal title="Excercise Modal"
          visible={this.state.excerciseVisible}
          onOk={() => this.setState({ excerciseVisible: 0 })}
          onCancel={() => this.setState({ excerciseVisible: 0 })}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >

            <Form.Item
              label="Hours of excercise"
            >

              <InputNumber
                onChange={(value) => this.setState({ hoursExcercise: value })} />

            </Form.Item>

            <Form.Item
              label="Rate excercise intesity"
            >

              <Rate
                onChange={(val) => { this.setState({ rateExcerciseIntensity: val }) }}
                value={this.state.rateExcerciseIntensity} allowHalf 
                character={({ index }) => customExcerciseIcons[index + 1]}/>

            </Form.Item>

          </Form>

        </Modal>


        <Modal title="Work Modal"
          visible={this.state.workVisible}
          onOk={() => this.setState({ workVisible: 0 })}
          onCancel={() => this.setState({ workVisible: 0 })}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >

            <Form.Item
              label="Hours of work"
            >

              <InputNumber
                onChange={(value) => this.setState({ hoursWork: value })} />

            </Form.Item>

          </Form>

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


import React from 'react';
import ReactDOM from 'react-dom';
import { Select, Card, Button, InputNumber, Menu, Row, Avatar, Col, Modal, Rate, Form, Input, Switch, Divider } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, LineChartOutlined, AppstoreOutlined, FrownOutlined, MehOutlined, SmileOutlined, FireOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import EChartsReact from 'echarts-for-react';
import json_data from './json_data.json' ;

const { Meta } = Card;
const { Option } = Select;

let separator = '/'
let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

export default class App extends React.Component {
  state = {
    current: 'one',
    hadBreakfast: 0,
    coffeeCount: 0,
    waterCount: 0,
    alcoholCount: 0,
    sleepVisible: 0,
    fatigueVisible: 0,
    excerciseVisible: 0,
    workVisible: 0,
    rateValue: 3,
    rateValueFatigue: 2,
    rateExcerciseIntensity: 2,
    hoursSleep: 0,
    hoursExcercise: 0,
    hoursWork: 0,
    date: `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`,

    //Overview page
    scatterSelect:"coffee"
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

  handleSaveToPC() {
    const fileData = JSON.stringify(this.state);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'filename.json';
    link.href = url;
    link.click();
  }

  handleLoadToPC() {
    fetch('./data/filename.json')
      .then((res) => res.json())
      .then((loadedData) => {
        this.setState({ loadedData: loadedData })
      })
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

    const scatterData = {'coffee':[[1, 2],[1, 1],[2, 3],[2.5, 1],[2.5, 3],[3, 2],[3.5, 1],[3, 2],[3.5, 4],
      [3, 4],[4, 3],[4.5, 4],[5, 5],],
      'water':[[1, 2],[5, 5],]
    
    }

    const customIcons = {
      1: <FrownOutlined />,
      2: <MehOutlined />,
      3: <SmileOutlined />,
    };

    const customExcerciseIcons = {
      1: <FireOutlined />,
      2: <FireOutlined />,
      3: <FireOutlined />,
      4: <FireOutlined />,
      5: <FireOutlined />,
    }

    let optionCalendar = {
      title: {
        top: 30,
        left: 'center',
        text: 'Fatigue Index'
      },
      tooltip: {},
      visualMap: {
        min: 1,
        max: 5,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2022',
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: false }
      },
      series: {
        name: 'Fatigue rating calendar',
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: [["2022-01-01", 4], ["2022-01-02", 3], ["2022-01-03", 4], ["2022-01-04", 5], ["2022-01-05", 3], ["2022-01-06", 4], ["2022-01-07", 5], ["2022-01-08", 3], ["2022-01-09", 4], ["2022-01-10", 5], ["2022-01-11", 3], ["2022-01-12", 4], ["2022-01-13", 5], ["2022-01-14", 3], ["2022-01-15", 3], ["2022-01-16", 5], ["2022-01-17", 5], ["2022-01-18", 5], ["2022-01-19", 4], ["2022-01-20", 5], ["2022-01-21", 4], ["2022-01-22", 5], ["2022-01-23", 4], ["2022-01-24", 3], ["2022-01-25", 3], ["2022-01-26", 5], ["2022-01-27", 4], ["2022-01-28", 3], ["2022-01-29", 3], ["2022-01-30", 5], ["2022-01-31", 4], ["2022-02-01", 3], ["2022-02-02", 3], ["2022-02-03", 2], ["2022-02-04", 2], ["2022-02-05", 3], ["2022-02-06", 4], ["2022-02-07", 2], ["2022-02-08", 4], ["2022-02-09", 3], ["2022-02-10", 3], ["2022-02-11", 2], ["2022-02-12", 2], ["2022-02-13", 4], ["2022-02-14", 4], ["2022-02-15", 3], ["2022-02-16", 4], ["2022-02-17", 2], ["2022-02-18", 4], ["2022-02-19", 3], ["2022-02-20", 2], ["2022-02-21", 2], ["2022-02-22", 3], ["2022-02-23", 2], ["2022-02-24", 4], ["2022-02-25", 2], ["2022-02-26", 2], ["2022-02-27", 3], ["2022-02-28", 2], ["2022-03-01", 5], ["2022-03-02", 5], ["2022-03-03", 4], ["2022-03-04", 1], ["2022-03-05", 4], ["2022-03-06", 1], ["2022-03-07", 1], ["2022-03-08", 4], ["2022-03-09", 2], ["2022-03-10", 5], ["2022-03-11", 4], ["2022-03-12", 1], ["2022-03-13", 5], ["2022-03-14", 5], ["2022-03-15", 5], ["2022-03-16", 2], ["2022-03-17", 4], ["2022-03-18", 1], ["2022-03-19", 4], ["2022-03-20", 1], ["2022-03-21", 3], ["2022-03-22", 5], ["2022-03-23", 3], ["2022-03-24", 2], ["2022-03-25", 3], ["2022-03-26", 3], ["2022-03-27", 4], ["2022-03-28", 3], ["2022-03-29", 5], ["2022-03-30", 1], ["2022-03-31", 4], ["2022-04-01", 2], ["2022-04-02", 3], ["2022-04-03", 2], ["2022-04-04", 2], ["2022-04-05", 2], ["2022-04-06", 3], ["2022-04-07", 3], ["2022-04-08", 3], ["2022-04-09", 5], ["2022-04-10", 3], ["2022-04-11", 5], ["2022-04-12", 1], ["2022-04-13", 4], ["2022-04-14", 4], ["2022-04-15", 5], ["2022-04-16", 2], ["2022-04-17", 4], ["2022-04-18", 1], ["2022-04-19", 1], ["2022-04-20", 3], ["2022-04-21", 1], ["2022-04-22", 3], ["2022-04-23", 1], ["2022-04-24", 1], ["2022-04-25", 4], ["2022-04-26", 3], ["2022-04-27", 4], ["2022-04-28", 4], ["2022-04-29", 3], ["2022-04-30", 5], ["2022-05-01", 2], ["2022-05-02", 1], ["2022-05-03", 5], ["2022-05-04", 3], ["2022-05-05", 3], ["2022-05-06", 3], ["2022-05-07", 2], ["2022-05-08", 4], ["2022-05-09", 3], ["2022-05-10", 2], ["2022-05-11", 5], ["2022-05-12", 4], ["2022-05-13", 4], ["2022-05-14", 5], ["2022-05-15", 5], ["2022-05-16", 5], ["2022-05-17", 2], ["2022-05-18", 3], ["2022-05-19", 2], ["2022-05-20", 2], ["2022-05-21", 3], ["2022-05-22", 2], ["2022-05-23", 2], ["2022-05-24", 2], ["2022-05-25", 4], ["2022-05-26", 3], ["2022-05-27", 5], ["2022-05-28", 4], ["2022-05-29", 2], ["2022-05-30", 4], ["2022-05-31", 5], ["2022-06-01", 5], ["2022-06-02", 5], ["2022-06-03", 1], ["2022-06-04", 3], ["2022-06-05", 3], ["2022-06-06", 1], ["2022-06-07", 3], ["2022-06-08", 2], ["2022-06-09", 5], ["2022-06-10", 1], ["2022-06-11", 5], ["2022-06-12", 4], ["2022-06-13", 4], ["2022-06-14", 1], ["2022-06-15", 5], ["2022-06-16", 1], ["2022-06-17", 2], ["2022-06-18", 5], ["2022-06-19", 5], ["2022-06-20", 1], ["2022-06-21", 3], ["2022-06-22", 3], ["2022-06-23", 2], ["2022-06-24", 5], ["2022-06-25", 4], ["2022-06-26", 2], ["2022-06-27", 2], ["2022-06-28", 2], ["2022-06-29", 3], ["2022-06-30", 4], ["2022-07-01", 2], ["2022-07-02", 3], ["2022-07-03", 4], ["2022-07-04", 2], ["2022-07-05", 2], ["2022-07-06", 2], ["2022-07-07", 2], ["2022-07-08", 2], ["2022-07-09", 2], ["2022-07-10", 4], ["2022-07-11", 4], ["2022-07-12", 1], ["2022-07-13", 2], ["2022-07-14", 2], ["2022-07-15", 1], ["2022-07-16", 3], ["2022-07-17", 2], ["2022-07-18", 3], ["2022-07-19", 2], ["2022-07-20", 4], ["2022-07-21", 2], ["2022-07-22", 4], ["2022-07-23", 1], ["2022-07-24", 3], ["2022-07-25", 2], ["2022-07-26", 3], ["2022-07-27", 3], ["2022-07-28", 1], ["2022-07-29", 1], ["2022-07-30", 3], ["2022-07-31", 2], ["2022-08-01", 1], ["2022-08-02", 3], ["2022-08-03", 1], ["2022-08-04", 2], ["2022-08-05", 2], ["2022-08-06", 2], ["2022-08-07", 2], ["2022-08-08", 3], ["2022-08-09", 3], ["2022-08-10", 2], ["2022-08-11", 2], ["2022-08-12", 2], ["2022-08-13", 3], ["2022-08-14", 1], ["2022-08-15", 1], ["2022-08-16", 1], ["2022-08-17", 3], ["2022-08-18", 1], ["2022-08-19", 2], ["2022-08-20", 2], ["2022-08-21", 2], ["2022-08-22", 1], ["2022-08-23", 2], ["2022-08-24", 1], ["2022-08-25", 3], ["2022-08-26", 1], ["2022-08-27", 1], ["2022-08-28", 1], ["2022-08-29", 1], ["2022-08-30", 2], ["2022-08-31", 2], ["2022-09-01", 3], ["2022-09-02", 3], ["2022-09-03", 2], ["2022-09-04", 1], ["2022-09-05", 5], ["2022-09-06", 4], ["2022-09-07", 1], ["2022-09-08", 1], ["2022-09-09", 4], ["2022-09-10", 3], ["2022-09-11", 5], ["2022-09-12", 3], ["2022-09-13", 3], ["2022-09-14", 1], ["2022-09-15", 5], ["2022-09-16", 4], ["2022-09-17", 3], ["2022-09-18", 3], ["2022-09-19", 2], ["2022-09-20", 1], ["2022-09-21", 3], ["2022-09-22", 5], ["2022-09-23", 2], ["2022-09-24", 3], ["2022-09-25", 3], ["2022-09-26", 4], ["2022-09-27", 5], ["2022-09-28", 1], ["2022-09-29", 1], ["2022-09-30", 3], ["2022-10-01", 3], ["2022-10-02", 5], ["2022-10-03", 2], ["2022-10-04", 2], ["2022-10-05", 3], ["2022-10-06", 5], ["2022-10-07", 1], ["2022-10-08", 1], ["2022-10-09", 3], ["2022-10-10", 5], ["2022-10-11", 2], ["2022-10-12", 4], ["2022-10-13", 3], ["2022-10-14", 2], ["2022-10-15", 4], ["2022-10-16", 3], ["2022-10-17", 3], ["2022-10-18", 2], ["2022-10-19", 5], ["2022-10-20", 3], ["2022-10-21", 4], ["2022-10-22", 4], ["2022-10-23", 1], ["2022-10-24", 5], ["2022-10-25", 5], ["2022-10-26", 5], ["2022-10-27", 5], ["2022-10-28", 5], ["2022-10-29", 4], ["2022-10-30", 4], ["2022-10-31", 5], ["2022-11-01", 4], ["2022-11-02", 4], ["2022-11-03", 2], ["2022-11-04", 5], ["2022-11-05", 4], ["2022-11-06", 2], ["2022-11-07", 1], ["2022-11-08", 3], ["2022-11-09", 3], ["2022-11-10", 4], ["2022-11-11", 5], ["2022-11-12", 5], ["2022-11-13", 5], ["2022-11-14", 2], ["2022-11-15", 1], ["2022-11-16", 2], ["2022-11-17", 5], ["2022-11-18", 4], ["2022-11-19", 4], ["2022-11-20", 2], ["2022-11-21", 1], ["2022-11-22", 3], ["2022-11-23", 4], ["2022-11-24", 3], ["2022-11-25", 4], ["2022-11-26", 4], ["2022-11-27", 2], ["2022-11-28", 4], ["2022-11-29", 2], ["2022-11-30", 5], ["2022-12-01", 2], ["2022-12-02", 5], ["2022-12-03", 4], ["2022-12-04", 3], ["2022-12-05", 2], ["2022-12-06", 2], ["2022-12-07", 2], ["2022-12-08", 5], ["2022-12-09", 4], ["2022-12-10", 2], ["2022-12-11", 2], ["2022-12-12", 5], ["2022-12-13", 3], ["2022-12-14", 4], ["2022-12-15", 2], ["2022-12-16", 3], ["2022-12-17", 4], ["2022-12-18", 3], ["2022-12-19", 1], ["2022-12-20", 1], ["2022-12-21", 4], ["2022-12-22", 3], ["2022-12-23", 1], ["2022-12-24", 3], ["2022-12-25", 5], ["2022-12-26", 1], ["2022-12-27", 5], ["2022-12-28", 2], ["2022-12-29", 2], ["2022-12-30", 1]]
      }
    };

    let optionLine = {
      title: {
        top: 30,
        left: 'center',
        text: 'Fatigue rating last week'
      },
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
          data: [3, 2, 4, 5, 4, 3, 1],
          type: 'line',
          smooth: true
        }
      ]
    };

    let optionScatter = {
      yAxis: {
        name: 'Fatigue rating',
        splitLine: { show: false }
      },
      xAxis: {
        name: this.state.scatterSelect + ' intake',
        splitLine: { show: false }
      },
      series: [
        {
          symbolSize: 12,
          data: scatterData[this.state.scatterSelect],
          type: 'scatter'
        }
      ]
    };

    let optionRadar = {
      title: {
        text: 'Basic Radar Chart'
      },
      legend: {
        data: ['Average measurments', 'Target measurements']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Water intake', max: 15 },
          { name: 'Sleep time', max: 12 },
          { name: 'Sleep Quality', max: 5 },
          { name: 'Alcohol intake', max: 15 },
          { name: 'Excercise time spent', max: 5 },
          { name: 'Average Excercise intensity', max: 5 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [7, 6, 3, 9, 1, 2],
              name: 'Average measurments'
            },
            {
              value: [10, 8, 4, 5, 2, 3],
              name: 'Target measurements'
            }
          ]
        }
      ]
    };
    console.log(json_data)

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
                    <Button type="primary" onClick={() => { this.setState({ workVisible: 1 }) }}>
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
                    <Switch onChange={(checked) => this.setState({ hadBreakfast: checked })} />,
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

            <Button
              style={{ float: 'right', marginRight: '40px' }}
              type='primary'
              onClick={this.handleSaveToPC.bind(this)}>save data</Button>

          </div>

          :
          <Card>

            <EChartsReact option={optionLine} notMerge={true} />
            <Divider/>

            <EChartsReact option={optionCalendar} notMerge={true} />
            <Divider/>

            <Select defaultValue="coffee" style={{ width: 120 }} 
            onChange={(value)=>this.setState({ scatterSelect :value})} >
              <Option value="coffee">coffee</Option>
              <Option value="water">water</Option>
              <Option value="alcohol" >alcohol</Option>
            </Select>
            <EChartsReact option={optionScatter} notMerge={true} />
            <Divider/>

            <EChartsReact option={optionRadar} notMerge={true} />
            
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
                character={({ index }) => customExcerciseIcons[index + 1]} />

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


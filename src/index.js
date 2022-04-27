import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Space, Select, Card, Button, InputNumber, Menu, Row, Avatar, Col, Modal, Rate, Form, Input, Switch, Divider, Steps, Affix } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, LineChartOutlined, AppstoreOutlined, FrownOutlined, MehOutlined, SmileOutlined, FireOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import EChartsReact from 'echarts-for-react';
import json_data from './json_data.json';
import * as echarts from 'echarts';

const { Meta } = Card;
const { Option } = Select;
const { Step } = Steps;


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
    rateValue: 0,
    rateValueFatigue: 0,
    rateExcerciseIntensity: 0,
    hoursSleep: 0,
    hoursExcercise: 0,
    hoursWork: 0,
    date: `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`,
    stepCount: 0,
    rateStress: 0,

    //Overview page
    //scatterSelect: "coffee",

    targetWater: 10,
    targetIntensity: 4,
    targetExcerciseTime: 2,
    targetAlcohol: 5,
    targetSleepTime: 8,
    targetSleepQuality: 4,
    targetStress: 2,
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  onClickPlus(value, type) {
    console.log(value, type)
    type === 'Coffee intake' ?
      this.setState({ coffeeCount: value + 1 }) :
      type === 'Water intake' ?
        this.setState({ waterCount: value + 1 }) :
        this.setState({ alcoholCount: value + 1 })
  }

  onClickMinus(value, type) {
    console.log(value, type)
    type === 'Coffee intake' && value > 0 ?
      this.setState({ coffeeCount: value - 1 }) :
      type === 'Water intake' && value > 0 ?
        this.setState({ waterCount: value - 1 }) :
        type === 'Alcohol intake' && value > 0 ?
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
    this.setState({ excerciseVisible: 1, stepCount: this.state.stepCount == 2 ? this.state.stepCount + 1 : this.state.stepCount })
  }

  handleChangeSleepRating(val) {
    this.setState({ rateValue: val, stepCount: this.state.stepCount == 1 ? this.state.stepCount + 1 : this.state.stepCount })
  }

  handleChangeFatigueRating(val) {
    this.setState({ rateValueFatigue: val, stepCount: this.state.stepCount == 0 ? this.state.stepCount + 1 : this.state.stepCount })
  }

  handleSaveToPC() {
    const fileData = JSON.stringify(this.state);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'filename.json';
    link.href = url;
    link.click();
    this.setState({ stepCount: this.state.stepCount == 5 ? this.state.stepCount + 1 : this.state.stepCount })
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

    const scatterData = {
      'coffee': [[1, 2], [1, 1], [2, 3], [2.5, 1], [2.5, 3], [3, 2], [3.5, 1], [3, 2], [3.5, 4],
      [3, 4], [4, 3], [4.5, 4], [5, 5],],
      'water': [[1, 2], [5, 5],]

    }

    const customIcons = {
      1: <FrownOutlined />,
      2: <FrownOutlined />,
      3: <FrownOutlined />,
      4: <FrownOutlined />,
      5: <FrownOutlined />,
    };

    const customWorkIcons = {
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
      tooltip: {
        formatter: function (p) {
          var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
          return format + ' fatigue value: ' + p.data[1];
        }
      },
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
        data: [["2022-01-01", 4], ["2022-01-02", 5], ["2022-01-03", 5], ["2022-01-04", 3], ["2022-01-05", 5], ["2022-01-06", 5], ["2022-01-07", 4], ["2022-01-08", 4], ["2022-01-09", 1], ["2022-01-10", 1], ["2022-01-11", 3], ["2022-01-12", 4], ["2022-01-13", 3], ["2022-01-14", 4], ["2022-01-15", 5], ["2022-01-16", 5], ["2022-01-17", 3], ["2022-01-18", 5], ["2022-01-19", 5], ["2022-01-20", 4], ["2022-01-21", 5], ["2022-01-22", 3], ["2022-01-23", 4], ["2022-01-24", 4], ["2022-01-25", 5], ["2022-01-26", 3], ["2022-01-27", 3], ["2022-01-28", 4], ["2022-01-29", 2], ["2022-01-30", 3], ["2022-01-31", 3], ["2022-02-01", 3], ["2022-02-02", 4], ["2022-02-03", 2], ["2022-02-04", 3], ["2022-02-05", 4], ["2022-02-06", 5], ["2022-02-07", 3], ["2022-02-08", 3], ["2022-02-09", 4], ["2022-02-10", 2], ["2022-02-11", 5], ["2022-02-12", 1], ["2022-02-13", 3], ["2022-02-14", 3], ["2022-02-15", 3], ["2022-02-16", 4], ["2022-02-17", 3], ["2022-02-18", 3], ["2022-02-19", 3], ["2022-02-20", 2], ["2022-02-21", 2], ["2022-02-22", 3], ["2022-02-23", 3], ["2022-02-24", 4], ["2022-02-25", 2], ["2022-02-26", 3], ["2022-02-27", 3], ["2022-02-28", 3], ["2022-03-01", 3], ["2022-03-02", 3], ["2022-03-03", 2], ["2022-03-04", 5], ["2022-03-05", 3], ["2022-03-06", 2], ["2022-03-07", 5], ["2022-03-08", 2], ["2022-03-09", 2], ["2022-03-10", 2], ["2022-03-11", 3], ["2022-03-12", 4], ["2022-03-13", 3], ["2022-03-14", 2], ["2022-03-15", 3], ["2022-03-16", 1], ["2022-03-17", 3], ["2022-03-18", 2], ["2022-03-19", 3], ["2022-03-20", 3], ["2022-03-21", 3], ["2022-03-22", 2], ["2022-03-23", 3], ["2022-03-24", 3], ["2022-03-25", 4], ["2022-03-26", 4], ["2022-03-27", 3], ["2022-03-28", 4], ["2022-03-29", 5], ["2022-03-30", 4], ["2022-03-31", 3], ["2022-04-01", 3], ["2022-04-02", 4], ["2022-04-03", 2], ["2022-04-04", 2], ["2022-04-05", 2], ["2022-04-06", 3], ["2022-04-07", 3], ["2022-04-08", 2], ["2022-04-09", 3], ["2022-04-10", 2], ["2022-04-11", 3], ["2022-04-12", 1], ["2022-04-13", 3], ["2022-04-14", 5], ["2022-04-15", 2], ["2022-04-16", 3], ["2022-04-17", 3], ["2022-04-18", 1], ["2022-04-19", 2], ["2022-04-20", 2], ["2022-04-21", 5], ["2022-04-22", 2], ["2022-04-23", 4], ["2022-04-24", 3], ["2022-04-25", 4], ["2022-04-26", 3], ["2022-04-27", 3], ["2022-04-28", 5], ["2022-04-29", 4], ["2022-04-30", 3], ["2022-05-01", 3], ["2022-05-02", 2], ["2022-05-03", 2], ["2022-05-04", 3], ["2022-05-05", 2], ["2022-05-06", 3], ["2022-05-07", 4], ["2022-05-08", 3], ["2022-05-09", 2], ["2022-05-10", 2], ["2022-05-11", 3], ["2022-05-12", 3], ["2022-05-13", 5], ["2022-05-14", 3], ["2022-05-15", 4], ["2022-05-16", 4], ["2022-05-17", 3], ["2022-05-18", 3], ["2022-05-19", 5], ["2022-05-20", 1], ["2022-05-21", 3], ["2022-05-22", 5], ["2022-05-23", 3], ["2022-05-24", 5], ["2022-05-25", 1], ["2022-05-26", 3], ["2022-05-27", 3], ["2022-05-28", 4], ["2022-05-29", 3], ["2022-05-30", 3], ["2022-05-31", 2], ["2022-06-01", 1], ["2022-06-02", 2], ["2022-06-03", 3], ["2022-06-04", 3], ["2022-06-05", 5], ["2022-06-06", 2], ["2022-06-07", 2], ["2022-06-08", 3], ["2022-06-09", 4], ["2022-06-10", 2], ["2022-06-11", 3], ["2022-06-12", 3], ["2022-06-13", 2], ["2022-06-14", 2], ["2022-06-15", 1], ["2022-06-16", 3], ["2022-06-17", 3], ["2022-06-18", 5], ["2022-06-19", 4], ["2022-06-20", 3], ["2022-06-21", 2], ["2022-06-22", 1], ["2022-06-23", 2], ["2022-06-24", 4], ["2022-06-25", 3], ["2022-06-26", 2], ["2022-06-27", 1], ["2022-06-28", 1], ["2022-06-29", 5], ["2022-06-30", 1], ["2022-07-01", 5], ["2022-07-02", 1], ["2022-07-03", 3], ["2022-07-04", 2], ["2022-07-05", 3], ["2022-07-06", 2], ["2022-07-07", 3], ["2022-07-08", 4], ["2022-07-09", 1], ["2022-07-10", 3], ["2022-07-11", 1], ["2022-07-12", 2], ["2022-07-13", 3], ["2022-07-14", 5], ["2022-07-15", 3], ["2022-07-16", 3], ["2022-07-17", 4], ["2022-07-18", 2], ["2022-07-19", 2], ["2022-07-20", 3], ["2022-07-21", 2], ["2022-07-22", 1], ["2022-07-23", 2], ["2022-07-24", 4], ["2022-07-25", 3], ["2022-07-26", 2], ["2022-07-27", 1], ["2022-07-28", 2], ["2022-07-29", 2], ["2022-07-30", 2], ["2022-07-31", 3], ["2022-08-01", 1], ["2022-08-02", 5], ["2022-08-03", 3], ["2022-08-04", 1], ["2022-08-05", 1], ["2022-08-06", 1], ["2022-08-07", 3], ["2022-08-08", 1], ["2022-08-09", 1], ["2022-08-10", 2], ["2022-08-11", 4], ["2022-08-12", 4], ["2022-08-13", 1], ["2022-08-14", 1], ["2022-08-15", 1], ["2022-08-16", 2], ["2022-08-17", 3], ["2022-08-18", 3], ["2022-08-19", 1], ["2022-08-20", 1], ["2022-08-21", 5], ["2022-08-22", 1], ["2022-08-23", 5], ["2022-08-24", 3], ["2022-08-25", 3], ["2022-08-26", 5], ["2022-08-27", 1], ["2022-08-28", 2], ["2022-08-29", 5], ["2022-08-30", 2], ["2022-08-31", 1], ["2022-09-01", 5], ["2022-09-02", 3], ["2022-09-03", 5], ["2022-09-04", 1], ["2022-09-05", 5], ["2022-09-06", 4], ["2022-09-07", 5], ["2022-09-08", 4], ["2022-09-09", 3], ["2022-09-10", 5], ["2022-09-11", 2], ["2022-09-12", 5], ["2022-09-13", 4], ["2022-09-14", 5], ["2022-09-15", 3], ["2022-09-16", 5], ["2022-09-17", 5], ["2022-09-18", 4], ["2022-09-19", 2], ["2022-09-20", 1], ["2022-09-21", 2], ["2022-09-22", 2], ["2022-09-23", 5], ["2022-09-24", 4], ["2022-09-25", 5], ["2022-09-26", 5], ["2022-09-27", 3], ["2022-09-28", 5], ["2022-09-29", 5], ["2022-09-30", 4], ["2022-10-01", 2], ["2022-10-02", 3], ["2022-10-03", 4], ["2022-10-04", 3], ["2022-10-05", 4], ["2022-10-06", 3], ["2022-10-07", 2], ["2022-10-08", 1], ["2022-10-09", 1], ["2022-10-10", 3], ["2022-10-11", 3], ["2022-10-12", 4], ["2022-10-13", 3], ["2022-10-14", 1], ["2022-10-15", 4], ["2022-10-16", 2], ["2022-10-17", 4], ["2022-10-18", 4], ["2022-10-19", 2], ["2022-10-20", 3], ["2022-10-21", 2], ["2022-10-22", 4], ["2022-10-23", 5], ["2022-10-24", 1], ["2022-10-25", 5], ["2022-10-26", 3], ["2022-10-27", 1], ["2022-10-28", 2], ["2022-10-29", 4], ["2022-10-30", 5], ["2022-10-31", 1], ["2022-11-01", 1], ["2022-11-02", 3], ["2022-11-03", 5], ["2022-11-04", 3], ["2022-11-05", 3], ["2022-11-06", 4], ["2022-11-07", 3], ["2022-11-08", 3], ["2022-11-09", 3], ["2022-11-10", 3], ["2022-11-11", 4], ["2022-11-12", 3], ["2022-11-13", 2], ["2022-11-14", 3], ["2022-11-15", 5], ["2022-11-16", 4], ["2022-11-17", 1], ["2022-11-18", 3], ["2022-11-19", 3], ["2022-11-20", 4], ["2022-11-21", 2], ["2022-11-22", 3], ["2022-11-23", 4], ["2022-11-24", 3], ["2022-11-25", 4], ["2022-11-26", 2], ["2022-11-27", 3], ["2022-11-28", 5], ["2022-11-29", 4], ["2022-11-30", 2], ["2022-12-01", 4], ["2022-12-02", 3], ["2022-12-03", 1], ["2022-12-04", 3], ["2022-12-05", 3], ["2022-12-06", 3], ["2022-12-07", 2], ["2022-12-08", 2], ["2022-12-09", 3], ["2022-12-10", 4], ["2022-12-11", 2], ["2022-12-12", 4], ["2022-12-13", 1], ["2022-12-14", 3], ["2022-12-15", 4], ["2022-12-16", 3], ["2022-12-17", 3], ["2022-12-18", 4], ["2022-12-19", 1], ["2022-12-20", 2], ["2022-12-21", 2], ["2022-12-22", 5], ["2022-12-23", 4], ["2022-12-24", 2], ["2022-12-25", 5], ["2022-12-26", 3], ["2022-12-27", 3], ["2022-12-28", 2], ["2022-12-29", 3], ["2022-12-30", 2]]
      }
    };

    let optionLine = {
      title: {
        top: 30,
        left: 'center',
        text: 'Fatigue overview last week'
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

    let optionBar = {
      title: {
        top: 30,
        left: 'center',
        text: 'Fatigue and nutrition'
      },
      animationDuration: 2000,
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', 'Water ', 'Alcohol', 'Coffee','Breakfast', "Fatigue"],
          ['Monday', 7, 0, 3,1, 3],
          ['Tuesday', 6, 3, 2,1, 2],
          ['Wednesday', 9, 0, 5,0, 4.5],
          ['Thursday', 4, 1, 1,0, 3.5],
          ['Friday', 6, 9, 2,1, 1],
          ['Saturday', 3, 6, 0,0, 5],
          ['Sunday', 8, 1, 4,1, 2.5]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' },{ type: 'bar' }, { type: 'line' }]
    };

    let optionScatter = {
      title: {
        top: 30,
        left: 'center',
        text: 'Fatigue rating vs intakes'
      },
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
      /* title: {
        text: 'Radar Chart'
      }, */
      legend: {},
      tooltip: {},
      radar: {
        shape: 'circle',

        indicator: [
          { name: 'Water intake', max: 15 },
          { name: 'Sleep time', max: 12 },
          { name: 'Sleep Quality', max: 5 },
          { name: 'Alcohol intake', max: 15 },
          { name: 'Excercise time spent', max: 5 },
          { name: 'Average Excercise intensity', max: 5 },
          { name: 'Average Stress level', max: 5 }
        ],
        center: ['50%', '60%'],
        radius: 120,
        startAngle: 90,
        splitNumber: 4,

      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [7, 6, 3, 9, 1, 2, 3],
              name: 'Average measurments'
            },
            {
              value: [this.state.targetWater, this.state.targetSleepTime, this.state.targetSleepQuality,
              this.state.targetAlcohol, this.state.targetExcerciseTime, this.state.targetIntensity, this.state.targetStress],
              name: 'Target measurements'
            }
          ]
        }
      ]
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



            <Affix>
              <Card >
                <Steps progressDot size="small" current={this.state.stepCount}>
                  <Step title="Log Fatigue data" />
                  <Step title="Log sleep data" />
                  <Step title="Log excercise data" />
                  <Step title="Log work data" />
                  <Step title="Log stress data" />
                  <Step title="Save data" />
                </Steps>
              </Card>
            </Affix>

            <br />

            <Row gutter={[16, 16]} justify="space-around" align="middle">


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
            <br />
            <Divider>Nutrition</Divider>
            <Row gutter={[16, 16]} justify="space-around" align="middle">
              <Col span={6} >


                {this.Item(
                  {
                    source: "https://github.com/MerkuryG/fatigue_app/blob/main/590836.png?raw=true",
                    title: "Coffee intake",
                    prefix: "cups",
                    description: "How many cups of coffee did you have today?",
                    value: this.state.coffeeCount
                  }
                )}

              </Col>

              <Col span={6}  >


                {this.Item(
                  {
                    source: "https://github.com/MerkuryG/fatigue_app/blob/main/3717054.png?raw=true",
                    title: "Water intake",
                    prefix: "glasses",
                    description: "How many glasses of water did you drink today?",
                    value: this.state.waterCount
                  }
                )}

              </Col>

              <Col span={6} >

                {this.Item(
                  {
                    source: "https://github.com/MerkuryG/fatigue_app/blob/main/920523.png?raw=true",
                    title: "Alcohol intake",
                    prefix: "units",
                    description: "How many units of alcohol did you drink today?",
                    value: this.state.alcoholCount
                  }
                )}

              </Col>

              <Col span={6} >

                <Card
                  style={{ width: 300 }}

                  actions={[
                    <Switch checkedChildren="Yes" unCheckedChildren="No"
                      onChange={(checked) => this.setState({ hadBreakfast: checked })} />,
                  ]}>
                  <Meta

                    avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/breakfast.png" />}
                    title='Breakfast'
                    description='Did you have breakfast today?'
                  />
                </Card>

              </Col>

              <Divider>Lifestyle</Divider>



              <Col span={6}>

                <Card
                  style={{ width: 300 }}

                  actions={[
                    <Button type="primary" onClick={this.onRateSleep.bind(this)}>
                      Rate your sleep </Button>,
                  ]}>
                  <Meta

                    avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/sleep.png" />}
                    title='Sleep'
                    description='How well and for how long did you sleep last night?'
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
                    title='Excercise'
                    description='Did you work out today? For how long?'
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
                    title='Work'
                    description='how many hours of work did you do today?'
                  />
                </Card>

              </Col>

              <Col span={6} >

                <Card
                  style={{ width: 300 }}

                  actions={[
                    <Rate defaultValue={this.state.rateStress} character={({ index }) => index + 1}
                      onChange={(value) => { this.setState({ rateStress: value, stepCount: this.state.stepCount == 4 ? this.state.stepCount + 1 : this.state.stepCount }) }} />
                  ]}>
                  <Meta

                    avatar={<Avatar src="https://raw.githubusercontent.com/MerkuryG/fatigue_app/main/stress.png" />}
                    title='Stress'
                    description='Rate your level of stress today'
                  />
                </Card>

              </Col>



            </Row>

            <br />
            <Row justify="space-around" align="middle">
              <Button
                //style={{ float: 'right', marginRight: '40px' }}
                //style={{ marginLeft:'630px'  }}
                type='primary'
                onClick={this.handleSaveToPC.bind(this)}>save data</Button>
            </Row>

          </div>

          :
          <div>
            <Card>

              <EChartsReact option={optionLine} notMerge={true} />
              <Divider />

              <EChartsReact option={optionBar} notMerge={true} />

              <Card>

                <Card style={{ justifyContent: 'space-between' }}
                  bordered={false}
                  actions={[
                    <Space direction='vertical'>
                      <p1>Target Water intake</p1>
                      <InputNumber
                        defaultValue={this.state.targetWater}
                        onChange={(val) => this.setState({ targetWater: val })} />
                    </Space>,

                    <Space direction='vertical'>
                      <p1>Target Alcohol intake</p1>
                      <InputNumber
                        defaultValue={this.state.targetAlcohol}
                        onChange={(val) => this.setState({ targetAlcohol: val })} />
                    </Space>,

                    <Space direction='vertical'>
                      <p1>Target Excercise intensity</p1>
                      <InputNumber
                        defaultValue={this.state.targetIntensity}
                        onChange={(val) => this.setState({ targetIntensity: val })} />
                    </Space>,

                    <Space direction='vertical'>
                      <p1>Target Excercise time spent</p1>
                      <InputNumber
                        defaultValue={this.state.targetExcerciseTime}
                        onChange={(val) => this.setState({ targetExcerciseTime: val })} />
                    </Space>,

                    <Space direction='vertical'>
                      <p1>Target Sleep quality</p1>
                      <InputNumber
                        defaultValue={this.state.targetSleepQuality}
                        onChange={(val) => this.setState({ targetSleepQuality: val })} />
                    </Space>,

                    <Space direction='vertical'>
                      <p1>Target Sleep time</p1>
                      <InputNumber
                        defaultValue={this.state.targetSleepTime}
                        onChange={(val) => this.setState({ targetSleepTime: val })} />
                    </Space>,

                    <Space direction='vertical'>
                      <p1>Target Stress Level</p1>
                      <InputNumber
                        defaultValue={this.state.targetStress}
                        onChange={(val) => this.setState({ targetStress: val })} />
                    </Space>

                  ]}
                >
                  <Space direction='vertical'>
                  <h3 style={{ marginLeft: '450px' }}>Radar</h3>
                  <p1 style={{ marginLeft: '450px' }}>Adjust radar chart target measurments</p1>
                  </Space>
                </Card>

                {/* <Select defaultValue="coffee" style={{ width: 120 }}
                onChange={(value) => this.setState({ scatterSelect: value })} >
                <Option value="coffee">coffee</Option>
                <Option value="water">water</Option>
                <Option value="alcohol" >alcohol</Option>
              </Select>
              <EChartsReact option={optionScatter} notMerge={true} />
              <Divider /> */}



                <EChartsReact option={optionRadar} notMerge={true} style={{ height: '370px' }} />
              </Card>

              <EChartsReact option={optionCalendar} notMerge={true} />

            </Card>

          </div>
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

        <Modal title="Excercise Data"
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
                onChange={(value) => this.setState({ hoursWork: value, stepCount: this.state.stepCount === 3 ? this.state.stepCount + 1 : this.state.stepCount })} />

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


import React from 'react';
import { Table, Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import SampleChart from '../../component/SampleChart';


const FormItem = Form.Item;

function mapStateToProps(state) {
    return {
      cardsList: state.cards.cardsList,
      cardsLoading: state.loading.effects['cards/queryList'],
    //   statistic: state.cards.statistic,
    };
  }
class List extends React.Component {

    state={
        visible:false,
        statisticVisible: false,
        id: null,
        statistic:[
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 1150 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
          ]

    }
    componentDidMount() {
        this.props.dispatch({
          type: 'cards/queryList',
        });
      }
    
    showModal=()=>{
        this.setState({
            visible:true,
        })
    }

    handleCancel=()=>{
        this.setState({
            visible:false,
        })
    }

    handleOk = () => {
        const { dispatch, form: { validateFields } } = this.props;
      
        validateFields((err, values) => {
          if (!err) {
            dispatch({
              type: 'cards/addOne',
              payload: values,
            });
            // 重置 `visible` 属性为 false 以关闭对话框
            this.setState({ visible: false });
          }
        });
      }
    
      showStatistic = (id) => {
        // this.props.dispatch({
        //   type: 'cards/getStatistic',
        //   payload: id,
        // });
        // // 更新 state，弹出包含图表的对话框
        this.setState({ id, statisticVisible: true });
      };
    
      handleStatisticCancel = () => {
        this.setState({
          statisticVisible: false,
        });
      }

    columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '描述',
        dataIndex: 'desc',
    },
    {
        title: '链接',
        dataIndex: 'url',
        render: value => <a href={value}>{value}</a>,
    },
    {
        title: '',
        dataIndex: '_',
        render: (_, { id }) => {
          return (
            <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
          );
        },
      },
    ];

    render() {
        const { cardsList, cardsLoading,form: { getFieldDecorator }} = this.props;
        const { visible,statisticVisible,statistic} = this.state;
        console.log("data",cardsList)
        return (
            <div>
            <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
            <Button onClick={this.showModal}>新建</Button>
            <Modal 
                title="新建记录"
                visible={visible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                destroyOnClose
                >
                <Form>
                    <FormItem label="名称">
                    {getFieldDecorator('name', {
                        rules: [{ required: true }],
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem label="描述">
                    {getFieldDecorator('desc')(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem label="链接">
                    {getFieldDecorator('url', {
                        rules: [{ type: 'url' }],
                    })(
                        <Input />
                    )}
                    </FormItem>
                </Form>
            </Modal>
            <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
        <SampleChart data={statistic} />
      </Modal>
            </div>
            
            
        );
    }
}

export default connect(mapStateToProps)(Form.create()(List));
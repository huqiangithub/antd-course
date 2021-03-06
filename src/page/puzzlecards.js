import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    // console.log("cardList:",cardList);
    return {
      cardList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onClickAdd: (newCard) => {
        //     const action = {
        //         type: `${namespace}/addNewCard`,
        //         payload: newCard,
        //     };
        //     dispatch(action);
        // },
        onDidMount:()=>{
            dispatch({
                type: `${namespace}/queryInitCards`
            })
        }
    };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
    
    componentDidMount(){
        this.props.onDidMount();
    }
    render() {
    return (
      <div>
        {
          this.props.cardList.map(card => {
            return (
              <Card key={card.id}>
                <div>Q: {card.setup}</div>
                <div>
                  <strong>A: {card.punchline}</strong>
                </div>
              </Card>
            );
          })
        }
        {/* <div>
          <Button onClick={()=>this.props.onClickAdd({
              setup: 'What happens to a frog\'s car when it breaks down?',
              punchline: 'It gets toad away',
              })}> 添加卡片 </Button>
        </div> */}
      </div>
    );
  }
}
import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
import { message } from 'antd';

export default {
    namespace: 'cards',
    state: {
            cardsList:[],
            statistic:[
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 1150 },
                { genre: 'Action', sold: 120 },
                { genre: 'Shooter', sold: 350 },
                { genre: 'Other', sold: 150 },
              ]
    },

    effects: {
        *queryList(_, sagaEffects) {
            try {
                const { call, put } = sagaEffects;
                const endPointURI = '/dev/quryList';
                const puzzle = yield call(request, endPointURI);

                yield put({ type: 'refreshList', payload: puzzle });
            } catch (e) {
                message.error('数据获取失败'); // 打印错误信息
            }
          
        },
        *addOne({ payload }, { call, put }) {
            
            try {
                const puzzle = {...payload,id:"4"};
                let data=[];
                data[0]=puzzle;
                yield put({ type: 'addCard', payload: data });
                message.success('新建成功'); 
            } catch (e) {
                message.error('新建失败'); // 打印错误信息
            }
          
        }
    },

    reducers: {
        refreshList(state, { payload: newCard }) {
          return {
            ...state,
                cardsList:newCard,
          };
        },
      addCard(state, { payload: newCard }) {
        const newCardsList = state.cardsList.concat(newCard);
        return {
            ...state,
              cardsList:newCardsList,
        };
      }
    }
  };
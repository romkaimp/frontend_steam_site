import {Card, Statistic} from "antd";
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {useState} from "react";
import ItemGraph from "./ItemGraph.jsx";

function ItemCard(props) {
    const [moreContent, setMoreContent] = useState(false)
    const [height, setHeight] = useState(300)
    const [width, setWidth] = useState(300)
    const currency = props.item
    const cost = currency.costs.at(-1)
    let up;
    let arrow;
    let coef = (currency.prediction.at(0).cost - currency.costs.at(-1).cost) / currency.costs.at(-1).cost
    let color;
    if (currency.prediction.at(0).cost < currency.prediction.at(1).cost) {
        up = 'up'
        color = '#3f8600'
        arrow = <ArrowUpOutlined />
    } else {
        up = 'down'
        color = '#ff2400'
        arrow = <ArrowDownOutlined />
    }
    console.log(props)

    const times = currency.costs.map(entry => entry.time).concat(currency.prediction.map(entry => entry.time))
    const prices = currency.costs.map(entry => entry.cost)
    const predictions = currency.prediction.map(entry => entry.cost)

    const preds = [
    Math.round(currency.prediction.at(0).cost * 100) / 100, 
    Math.round(currency.prediction.at(1).cost * 100) / 100,
    Math.round(currency.prediction.at(2).cost * 100) / 100,
    ]
    const plot = () => {
        return (<ItemGraph />)
    }
    return (
        <>
            <Card
                title={<div className="flex items-center gap-3">
                    <img src={currency.img}></img>
                    <span>{props.item.name}</span>
                </div>}
                extra={<a href="#" onClick={() =>
                {
                    moreContent ? setMoreContent(false) : setMoreContent(true)
                    moreContent ? setWidth(300) : setWidth(1000)
                    moreContent ? setHeight(300) : setHeight(800)
                }
                }>More</a>}
                style={{
                    height: height,
                    width: width,
            }}
            >
                <p>Последняя цена: {Math.round(cost.cost * 100) / 100}, время: {cost.time}</p>
                <p>Предсказания: {up} {preds[0]}, {preds[1]}, {preds[2]}</p>
                <p>Steam: <a href={currency.href}>{currency.name}</a></p>
                <p>{moreContent ?
                    <Card bordered={false}>
                        <img src={currency.img.slice(0, -8)}></img>
                        <Statistic
                            title="Market Item"
                            value={coef}
                            precision={3}
                            valueStyle={{color: color}}
                            prefix={arrow}
                            suffix="%"
                        />
                        <ItemGraph costs={prices} preds={predictions} times={times}/>
                    </Card> : null
                }
                </p>
            </Card>
        </>
    )
}

const costShape = PropTypes.shape({
  cost: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired
});

ItemCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        costs: PropTypes.arrayOf(costShape).isRequired,
        prediction: PropTypes.arrayOf(costShape).isRequired,
        img: PropTypes.string,
        href: PropTypes.string
  }).isRequired,
};

export default ItemCard

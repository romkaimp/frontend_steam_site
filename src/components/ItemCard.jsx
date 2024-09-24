import {Card} from "antd";
import PropTypes from 'prop-types';

function ItemCard(props) {
    const currency = props.item
    const cost = currency.costs.at(-1)
    let up;
    if (currency.prediction.at(0).cost < currency.prediction.at(1).cost)
        up = 'up'
    else
        up = 'down'
    console.log(props)
    const preds = [
    Math.round(currency.prediction.at(0).cost * 100) / 100, 
    Math.round(currency.prediction.at(1).cost * 100) / 100,
    Math.round(currency.prediction.at(2).cost * 100) / 100
    ]
    return (
        <>
            <Card
                title={<div className="flex items-center gap-3">
                    <img src='https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQznaKdID5D6d23ldHSwKOmZeyEz21XvZZ12LzE9t6nigbgqkplNjihJIaLMlhpF1ZeR5c/62fx62f'></img>
                    <span>{props.item.name}</span>
                </div>}
                extra={<a href="#">More</a>}
                style={{
                width: 300,
            }}
            >
                <p>Последняя цена: {Math.round(cost.cost * 100) / 100}, время: {cost.time}</p>
                <p>Предсказания: {up} {preds[0]}, {preds[1]}, {preds[2]}</p>
                <p>Card content</p>
            </Card>
        </>
    )
}

ItemCard.propTypes = {
  item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      costs: PropTypes.array.isRequired,
      prediction: PropTypes.array.isRequired,
  }).isRequired,
};

export default ItemCard

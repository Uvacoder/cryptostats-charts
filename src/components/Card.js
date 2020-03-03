import React from 'react';
import { Line } from 'react-chartjs-2';
import { roundOff, toMoney } from '../utils';

const options = {
	legend: {
		display: false,
	},
	tooltips: {
		enabled: false,
	},
	scales: {
		yAxes: [
			{
				id: 'y-0',
				display: false,
				type: 'linear',
				gridLines: {
					display: false,
				},
			},
		],
		xAxes: [
			{
				id: 'x-0',
				display: false,
				gridLines: {
					display: false,
				},
			},
		],
	},
	responsive: true,
	maintainAspectRatio: false,
};

function renderData(sparkline) {
	return {
		labels: Array(sparkline.length).fill(0),
		datasets: [
			{
				backgroundColor: 'rgba(0,0,0,0)',
				borderColor: 'hsl(171, 100%, 41%)',
				borderCapStyle: 'round',
				borderJoinStyle: 'round',
				lineTension: 0.4,
				xAxisId: 'x-0',
				yAxisID: 'y-0',
				pointRadius: 0,
				pointHoverRadius: 0,
				fill: true,
				showLine: true,
				data: sparkline,
			},
		],
	};
}

const Card = ({ data }) => {
	const {
		sparkline_in_7d: { price: sparkline },
		symbol,
		current_price: price,
		image,
		price_change_percentage_1h_in_currency: trend1h,
		price_change_24h: priceChange24h,
		name,
	} = data;

	const sortUpIcon = (
		<span className="icon has-text-success">
			<i className="fas fa-sort-up" />
		</span>
	);

	const sortDownIcon = (
		<span className="icon has-text-danger">
			<i className="fas fa-sort-down" />
		</span>
	);

	return (
		<div>
			<div className="card">
				<div className="card-content">
					<div className="content">
						<div className="is-flex justify-between">
							<div className="has-text-weight-semibold is-size-5-desktop is-size-6-tablet">
								{name}
							</div>
							<div className="has-text-weight-semibold is-size-5-desktop is-size-6-tablet">
								{toMoney(price)}
							</div>
						</div>
						<div className="is-flex justify-between">
							<div className="has-text-grey has-text-weight-semibold is-size-5-desktop id-size-6-tablet is-flex justify-center align-center">
								<img
									style={{ width: 25, marginRight: 6 }}
									src={image}
									alt="logo"
								/>
								<span>{symbol.toUpperCase()}</span>
							</div>
							<div
								className={`${
									trend1h > 0 ? 'has-text-success' : 'has-text-danger'
								} has-text-weight-semibold is-size-5-desktop id-size-6-tablet`}
							>
								({roundOff(trend1h)}
								%) {toMoney(priceChange24h)}
								{trend1h > 0 ? sortUpIcon : sortDownIcon}
							</div>
						</div>
					</div>
				</div>
				<div style={{ height: 120 }}>
					<Line data={renderData(sparkline)} width={120} options={options} />
				</div>
			</div>
		</div>
	);
};

export default Card;

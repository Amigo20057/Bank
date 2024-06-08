import ReactECharts from 'echarts-for-react'
import React from 'react'

interface ICart {
	received: number
	spent: number
}

export const Chart: React.FC<ICart> = ({ received, spent }) => {
	const getOption = () => {
		return {
			tooltip: {
				trigger: 'item',
			},
			series: [
				{
					name: 'BANK',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2,
					},
					label: {
						show: false,
						position: 'center',
					},
					emphasis: {
						label: {
							show: true,
							fontSize: 40,
							fontWeight: 'bold',
						},
					},
					labelLine: {
						show: false,
					},
					data: [
						{ value: received, name: 'Отримано $' },
						{ value: spent, name: 'Витрачено $' },
					],
				},
			],
		}
	}

	return <ReactECharts option={getOption()} />
}

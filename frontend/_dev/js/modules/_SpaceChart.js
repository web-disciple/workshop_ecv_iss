import Chart from "chart.js"

class SpaceChart {
    constructor() {
        this.chart = null,
            this.labels = [],
            this.data = []
    }
    init(timestamp, velocity) {
        this.neonLine();
        let ctx = document.getElementById('space-chart');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: '',
                    data: this.data,
                    backgroundColor: 'rgba(255, 99, 132, 0)',
                    borderColor: 'rgba(159, 151, 255, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false,
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        });
        this.spaceGraphData(timestamp, velocity)
    }
    neonLine() {
        let draw = Chart.controllers.line.prototype.draw;
        Chart.controllers.line.prototype.draw = function () {
            draw.apply(this, arguments);
            let ctx = this.chart.chart.ctx;
            let _stroke = ctx.stroke;
            ctx.stroke = function () {
                ctx.save();
                ctx.shadowColor = "rgba(159, 151, 255, 1)";
                ctx.shadowBlur = 8;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                _stroke.apply(this, arguments);
                ctx.restore();
            };
        };
    }

    spaceGraphData(timestamp, velocity) {
        let label = new Date(timestamp * 1000).getHours() + ':' + new Date(timestamp * 1000).getMinutes()
        this.labels.push(label)
        this.data.push(velocity)
        this.chart.update();
    }
}

export default SpaceChart;
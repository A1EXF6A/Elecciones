import { PieChart, Svg } from "chartist"
import { useState, useCallback, useRef, useEffect } from "react"
import { getPartidos } from "../util/data"
import { Partido } from "../util/models/PartidoModel"

const colors = ['#FFC107', '#FF5722', '#03A9F4', '#4CAF50', '#9C27B0', '#E91E63'
    , '#795548', '#607D8B', '#FF9800', '#00BCD4', '#8BC34A', '#CDDC39', '#FFEB3B'
    , '#FF5722', '#795548', '#607D8B', '#FF9800', '#00BCD4', '#8BC34A', '#CDDC39'
    , '#FFEB3B', '#FF5722', '#795548', '#607D8B', '#FF9800', '#00BCD4', '#8BC34A'
    , '#CDDC39', '#FFEB3B', '#FF5722', '#795548', '#607D8B', '#FF9800', '#00BCD4'
    , '#8BC34A', '#CDDC39', '#FFEB3B', '#FF5722', '#795548', '#607D8B', '#FF9800'
    , '#00BCD4', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF5722', '#795548', '#607D8B'
    , '#FF9800', '#00BCD4', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF5722', '#795548'
    , '#607D8B', '#FF9800', '#00BCD4', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF5722'
    , '#795548', '#607D8B', '#FF9800', '#00BCD4', '#8BC34A', '#CDDC39', '#FFEB3B'
    , '#FF5722', '#795548', '#607D8B', '#FF9800', '#00BCD4', '#8BC34A', '#CDDC39'
    , '#FFEB3B', '#FF5722', '#795548', '#607D8B', '#FF9800', '#00BCD4', '#8BC34A'
    , '#CDDC39', '#FFEB3B', '#FF5722', '#795548', '#607D8B', '#FF9800', '#00BCD4'
    , '#8BC34A', '#CDDC39', '#FFEB3B', '#FF572'];

const PieChartVote = ({ tipo_eleccion }: { tipo_eleccion: number }) => {
    const [partidos, setPartidos] = useState<Partido[]>([])

    const fetchData = useCallback(async () => {
        const data = await getPartidos(tipo_eleccion)

        if (data.partidos) {
            setPartidos(data.partidos)
        }
    }, [tipo_eleccion])

    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchData()
    }, [chartRef, fetchData]);

    useEffect(() => {
        const data = {
            labels: partidos.map((partido) => partido.num_votos > 0 ? partido.num_votos : null).filter(label => label !== null),
            series: partidos.map((partido, index) => {
                if (partido.num_votos > 0) {
                    return { value: partido.num_votos, meta: colors[index] }
                }
            }).filter(serie => serie !== undefined)
        }
        console.log(data)

        if (chartRef.current) {
            new PieChart(chartRef.current, data, {
                plugins: [
                    (chart) => {
                        chart.on('draw', (data: { type: string; element: Svg; meta: { fillColor: string } }) => {
                            if (data.type === 'slice') {
                                data.element.attr({
                                    style: `fill: ${data.meta}`,
                                });
                            }
                        });
                    },
                ],
            });

        }
    }, [partidos])

    return (
        <section className="chart-section">
            <div className="chart-labels">
                {partidos.map((partido, index) => (
                    <div className="chart-label" key={partido.id}>
                        <div className="chart-label-color" style={{ backgroundColor: colors[index] }}></div>
                        <p>{partido.candidatos[0].name}</p>
                    </div>
                ))}
            </div>
            <div ref={chartRef} className="chart-container"></div>
        </section>
    )
}

export default PieChartVote;
import React from 'react';
import {  VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLabel } from 'victory'; // Victory charts - https://formidable.com/open-source/victory/docs/

const hoverEvent = [{
    target: "data",
    eventHandlers: {
        onMouseOver: () => {
            return [{
                target: "data",
                mutation: () => ({ style: { fill: "#bbb" }})

            }, {
                target: "labels",
                mutation: () => ({ active: true })
            }];
        },
        onMouseOut: () => {
            return [{
                target: "data",
                mutation: () => { return null; }
            }, {
                target: "labels",
                mutation: () => ({ active: false })
            }];
        }
    }
}]

export function MarketCapChart(props) {
    return (
        <VictoryChart domainPadding={10} theme={VictoryTheme.material} height={350} width={450} >
        <VictoryLabel text="Top 10 Cryptos by Market Cap" x={225} y={30} textAnchor="middle"/>
            <VictoryAxis />
            <VictoryAxis dependentAxis tickFormat={(x) => (`$${x / 1000000000}b`)}   />
            <VictoryBar 
                data={props.currencies.sort((c1,c2) => (c1.marketCapitalization  < c2.marketCapitalization) ? 1 : -1).slice(0,10)} 
                x="ticker" y="marketCapitalization" 
                scale={{y: "linear"}}  
                labels={props.currencies.map(c1 => c1.name + '\n$' + (c1.marketCapitalization / 1000000000).toFixed(2) + 'b')}
                labelComponent={    
                <VictoryTooltip 
                  cornerRadius={0}
                /> }
                style={{data: {fill: "teal"}}}
                events={hoverEvent}
            />    
        </VictoryChart>
    )
}

export function PriceChart(props) {
    return (
        <VictoryChart domainPadding={10} theme={VictoryTheme.material} height={350} width={450}  >
            <VictoryLabel text="Top 10 Cryptos by Price (USD)" x={225} y={30} textAnchor="middle"/>
            <VictoryAxis />
            <VictoryAxis dependentAxis  tickFormat={(x) => (`$${x / 1000}k`)}  />
            <VictoryBar 
            data={props.currencies.sort((c1,c2) => (c1.price  < c2.price) ? 1 : -1).slice(0,10)} 
            x="ticker" y="price" 
            labels={props.currencies.map(c1 => c1.name + '\n$' + c1.price.toFixed(2))}
              labelComponent={    
                <VictoryTooltip 
                  cornerRadius={0}
                /> }

            style={{data: {fill: "tomato"}}}
            events={hoverEvent}
            />
        </VictoryChart>
    )
}

export function GainersChart(props) {
    return (
        <VictoryChart domainPadding={10} theme={VictoryTheme.material} height={350} width={450}>
        <VictoryLabel text="Top 10 Gainers by % Increase" x={225} y={30} textAnchor="middle"/>
            <VictoryAxis  />
            <VictoryAxis dependentAxis tickFormat={(x) => (`${x}%`)}   />
            <VictoryBar 
                data={props.currencies.sort((c1,c2) => (c1.changes  < c2.changes) ? 1 : -1).slice(0,10)} 
                x="ticker" y="changes" 
                scale={{y: "linear"}}  
                padding={{top: 50}}
                labels={props.currencies.map(c1 => c1.name + '\n' + (c1.changes).toFixed(2) + '%')}
                labelComponent={    
                <VictoryTooltip 
                  cornerRadius={0}
                /> }
                style={{data: {fill: "darkgreen"}}}
                events={hoverEvent}

            />    
        </VictoryChart>
    )
}

export function LosersChart(props) {
    return (
        <VictoryChart domainPadding={10} theme={VictoryTheme.material} height={350} width={450} offsetY={300} style={{parent: {marginTop: "40px" }}}>
        <VictoryLabel text="Top 10 Losers by % Decrease" x={225} y={10} textAnchor="middle"/>
            <VictoryAxis    />
            <VictoryAxis dependentAxis  tickFormat={(x) => (`${x}%`)}   />
            <VictoryBar 
                data={props.currencies.sort((c1,c2) => (c1.changes  < c2.changes) ? -1 : 1).slice(0,10)} 
                x="ticker" y="changes" 
                scale={{y: "linear"}}  
                labels={props.currencies.map(c1 => c1.name + '\n' + (c1.changes).toFixed(2) + '%')}
                labelComponent={    
                <VictoryTooltip 
                  cornerRadius={0}
                /> }
                style={{data: {fill: "darkred"}}}
                events={hoverEvent}
            />    
        </VictoryChart>
    )
}
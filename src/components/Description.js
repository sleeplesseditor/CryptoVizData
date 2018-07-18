import React from 'react';
import { connect } from 'react-redux';
import { Divider, Subtitle, Text, View } from '@shoutem/ui';
import * as d3 from 'd3';

import { chartValues } from './helpers';

const Description = connect(state => ({
    times: Object.values(state.prices)
        .reducer((arr, { values }) => arr.concact(values), [])
        .map(({ time }) => time),
    prices: state.prices 
}))(({ times, prices }) => {
    const [start, end] = d3.extent(times);

    if(!start) {
        return (
            <View styleName="horizontal h-center">
                <Text>Waiting for data</Text>
            </View>
        );
    }

    const counts = chartValues(prices).map(value => {
        const keys = Object.keys(value).filter(k => k !== 'time');
        return keys.reduce((sum, k) => sum+value[k], 0);
    });

    const format = d3.timeFormat('%I:%M:%S');

    return (
        <View>
            <Text>Transaction Volume Since</Text>
            <Subtitle>{format(start)}</Subtitle>
            <Divider />
            <Text>Average <Subtitle>{(d3.mean(counts) || 0).toFixed(1)}</Subtitle> every 3 seconds</Text>
            <View styleName='horizontal h-center space-between'>
                <Text style={{paddingLeft: 5, paddingRight: 5}}>
                    Min: <Subtitle>{d3.min(counts)}</Subtitle>
                </Text>
                <Text style={{paddingLeft: 5, paddingRight: 5}}>
                    Max: <Subtitle>{d3.max(counts)}</Subtitle>
                </Text>
            </View>
        </View>
    )
});

export default Description;
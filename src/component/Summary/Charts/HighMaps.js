import React, { useEffect, useRef, useState } from "react";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartMap from "highcharts/modules/map";
import {cloneDeep} from 'lodash'

HighchartMap(Highchart);

const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.2, "#FF8A66"],
      [0.2, "#FF392B"],
      [0.2, "#B71525"],
      [1, "#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Dân Số",
      joinBy: ["hc-key", "key"],
    },
  ],
};

 function HighMaps({ mapData }) {
  const [options, setOptions] = useState({});
  const chartRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  

  useEffect(() => {
    if(mapData && Object.keys(mapData).length){
      const fakeData = mapData.features.map((item, index) => ({ 
        key: item.properties['hc-key'],
        value: index 
      }));
      setOptions({
        ...initOptions,
        series: [
          { ...initOptions.series[0],
             mapData, 
             data: fakeData }],
      });
      if(!mapLoaded) {
        setMapLoaded(true)
      }
    }
  }, [mapData,mapLoaded]);

  useEffect(() => {
    if(chartRef && chartRef.current){
      chartRef.current.chart.series[0].update({
        mapData,
      })
    }
  },[mapData])
  if(!mapLoaded) return null
 
  return (
    <HighchartsReact
      highcharts={Highchart}
      options={cloneDeep(options)}
      constructorType="mapChart"
      ref={chartRef}
    
    />
  );
}
export default React.memo(HighMaps)
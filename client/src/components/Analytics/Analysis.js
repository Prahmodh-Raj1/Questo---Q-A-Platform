import React from 'react'
import PieChart from './PieChart'
import BarChart from './BarGraph'
import UserStatistics from './UserStatistics'
import LineChart from './LineChart'
function Analysis() {
  return (
    <div>
        <UserStatistics/>
        <PieChart/>
<LineChart/>
<BarChart/>


    </div>
  )
}

export default Analysis
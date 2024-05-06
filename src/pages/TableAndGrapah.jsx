import React, { useState } from 'react'
import TableDataCSV from '../components/Table/Table'
import PieChartSentiment from '../components/Graph/PieChartSentiment'
import { fetchEmotion, fetchSentiment } from '../apis/huggi'
import { useQuery } from '@tanstack/react-query'
import PieChartEmotion from '../components/Graph/PieChartEmotion'
import { Typography } from '@mui/material'

const TableAndGrapah = ({data}) => {
    const [textQuery, setTextQuery] = useState('')
    const sentimentData = useQuery({
        queryKey:['sentiment', textQuery],
        queryFn: ()=>fetchSentiment(textQuery),
        enabled:!!textQuery
    })
    const emotionData = useQuery({
        queryKey:['emotion', textQuery],
        queryFn: ()=>fetchEmotion(textQuery),
        enabled:!!textQuery
    })
  return (
    <div className='w-full'>
      <div className="mt-10">
        <Typography style={{fontWeight:'bold', marginBottom:2}}>Table CSV Load</Typography>
        <TableDataCSV data={data} setTextQuery={setTextQuery}/>
      </div>

        <div className="flex flex-wrap min-h-50">
        {/* <!-- Card 1 --> */}
        <div className="w-full sm:w-1/2 p-4  min-h-50">
          {/* <!-- Card content goes here --> */}
          <div className="bg-white rounded-lg shadow-md p-6  min-h-50 w-full">
            {/* <!-- Card content --> */}
            {( sentimentData.data?.length> 0 )? 
            <>
              <Typography sx={{fontWeight:'bold'}}>Graph for Sentiment</Typography>
              <PieChartSentiment data={sentimentData.data} />

            </>
            :   
            sentimentData.isLoading && 
              <div className="w-full min-h-[200px]">
              <div className="bg-gray-200 animate-pulse rounded-lg shadow-md p-6 min-h-[200px]">
              <div className="h-4 w-1/2 bg-gray-300 rounded"><Typography>Loadind Data</Typography></div>
              <div className="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>
            }
          </div>
        </div>

        {/* <!-- Card 2 --> */}
        <div className="w-full sm:w-1/2 p-4  min-h-50">
          {/* <!-- Card content goes here --> */}
          <div className="bg-white rounded-lg shadow-md p-6 min-h-5 w-full">
            {/* <!-- Card content --> */}
            {( emotionData.data?.length> 0 )?   
            <>
              <Typography sx={{fontWeight:'bold'}}>Graph for Emotion</Typography>
              <PieChartEmotion data={emotionData.data} />

            </>        
            :   
            <div className="w-full min-h-[200px]">
              <div className="bg-gray-200 animate-pulse rounded-lg shadow-md p-6 min-h-[200px]">
              <div className="h-4 w-1/2 bg-gray-300 rounded"><Typography>Loadind Data</Typography></div>
              <div className="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>

  )
}

export default TableAndGrapah
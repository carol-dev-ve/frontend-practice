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

        <div class="flex flex-wrap min-h-50">
        {/* <!-- Card 1 --> */}
        <div class="w-full sm:w-1/2 p-4  min-h-50">
          {/* <!-- Card content goes here --> */}
          <div class="bg-white rounded-lg shadow-md p-6  min-h-50 w-full">
            {/* <!-- Card content --> */}
            {( sentimentData.data?.length> 0 )? 
            <>
              <Typography sx={{fontWeight:'bold'}}>Graph for Sentiment</Typography>
              <PieChartSentiment data={sentimentData.data} />

            </>
            :   
            sentimentData.isLoading && 
              <div class="w-full min-h-[200px]">
              <div class="bg-gray-200 animate-pulse rounded-lg shadow-md p-6 min-h-[200px]">
              <div class="h-4 w-1/2 bg-gray-300 rounded"><Typography>Loadind Data</Typography></div>
              <div class="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                <div class="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                <div class="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>
            }
          </div>
        </div>

        {/* <!-- Card 2 --> */}
        <div class="w-full sm:w-1/2 p-4  min-h-50">
          {/* <!-- Card content goes here --> */}
          <div class="bg-white rounded-lg shadow-md p-6 min-h-5 w-full">
            {/* <!-- Card content --> */}
            {( emotionData.data?.length> 0 )?   
            <>
              <Typography sx={{fontWeight:'bold'}}>Graph for Emotion</Typography>
              <PieChartEmotion data={emotionData.data} />

            </>        
            :   
            <div class="w-full min-h-[200px]">
              <div class="bg-gray-200 animate-pulse rounded-lg shadow-md p-6 min-h-[200px]">
              <div class="h-4 w-1/2 bg-gray-300 rounded"><Typography>Loadind Data</Typography></div>
              <div class="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                <div class="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                <div class="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>

  )
}

export default TableAndGrapah
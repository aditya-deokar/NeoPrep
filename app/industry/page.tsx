// import Dashboard from '@/components/dashboard'
// import { industryData } from '@/lib/data'
// import React from 'react'

// const page = () => {
//   return (
   

//         <Dashboard data={industryData}/>
    
//   )
// }

// export default page



import { getIndustryInsights } from '@/actions/industry';
import { getUserOnboardingStatus } from '@/actions/user';
import Dashboard from '@/components/dashboard';
import { redirect } from 'next/navigation';
import React from 'react'


const IndustryInsightsPage = async() => {

    // check if user is already onboarded
const { isOnboarded }= await getUserOnboardingStatus();

const insights= await getIndustryInsights();
console.log(insights);

if(!isOnboarded){
  redirect("/onboarding");
}


  return (
    <div className='container mx-auto'>
        {/* <DashboardView insights={insights}/> */}

        <Dashboard data={insights}/>
    </div>
  )
}

export default IndustryInsightsPage
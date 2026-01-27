import React from 'react'
import Leads from './leads'
import GetInvolvedBanner from './banner'
import OrganisationDetails from './address'
import App from 'next/app'


export default function Page() {
  return (
    <>
    <GetInvolvedBanner/>

    <OrganisationDetails/>
    <Leads/>
    </>
  )
}



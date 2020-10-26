import React from 'react'
import styled from 'styled-components'

import BannerImage from '../elements/BannerImage'
import InputText from '../elements/InputText'
import InputArea from '../elements/InputArea'
import Button from '../elements/Button'
import Geocoder from '../map/Geocoder'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
  width: 60vw;
  height: 400px;
`

class CampaignCreate extends React.Component{
  state = {
    formData: {
      name: '',
      volunteer_count: null,
      description: '',
      latitude: '',
      longitude: '',
      start_date: null
    }
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    this.setState({ formData })
  }

  handleSubmit = event => {
    // format latitude/longitude into formdata
    // send to backend
    console.log(this.state.formData)
  }

  inputWidth = '80%'
  buttonWidth = '60%'

  render(){

    return (
      <>
        <BannerImage style={{ height: '150px' }}/>
        <Wrapper>
          <InputText width={this.inputWidth} label='Give your campaign a name...' name='name' returnValue={this.handleChange} />
          <InputText width={this.inputWidth} type='number' label='How many volunteers will you need?' name='volunteer_count' returnValue={this.handleChange} />
          <InputArea width={this.inputWidth} name='description' returnValue={this.handleChange} />
          <InputText width={this.inputWidth} label='Replace with geocoder' returnValue={this.handleChange} />
          <InputText width={this.inputWidth} type='datetime-local' label='When does your campaign start?' name='start_date' returnValue={this.handleChange} />
          <Button width={this.buttonWidth} label='Save your campaign' onClick={this.handleSubmit}/>
        </Wrapper>
      </>
    )
  }
}

export default CampaignCreate
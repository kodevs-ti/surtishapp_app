import Container from '../components/Layout/container'
import Form from '../components/Form'

import img from '../public/img/welcome-intro.svg'

export default function Home () {
  return (
    <Container>
      <div className='d-flex flex-column'>
        <img src={img} className='img-fluid mb-5' />
        <Form />
      </div>
    </Container>
  )
}

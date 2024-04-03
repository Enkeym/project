import {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {useAddProductMutation} from '../../../app/services/products'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import FormOption from '../../../ui/form/FormOption'
import FormInput from '../../../ui/form/FormInput'

const AddProducts = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const [addProducts] = useAddProductMutation()
  const navigate = useNavigate()

  const handleAddProducts = async (e) => {
    e.preventDefault()

    try {
      await addProducts({
        title,
        price,
        description,
        image,
        categoryId
      }).unwrap()
      toast.success('Created successfully!')
      handleClose()
      setTitle('')
      setPrice('')
      setDescription('')
      setImage('')
      setCategoryId('')
      navigate('/products/my')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow} className='m-1'>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProducts}>
            <FormInput
              name={'Name'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={'name'}
              type={'text'}
            />

            <FormInput
              name={'Price'}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={'price'}
              type={'number'}
              min='0'
              step='0.01'
              required
            />

            <FormInput
              name={'Description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={'description'}
              type={'text'}
              required
            />

            <FormInput
              name={'Image'}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder={'image as URL'}
              type={'text'}
              required
            />

            <FormOption
              name={'Category'}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              initialName={categoryId}
              required
            />

            <Button type='submit' variant='primary' className='me-2'>
              Add
            </Button>

            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default AddProducts

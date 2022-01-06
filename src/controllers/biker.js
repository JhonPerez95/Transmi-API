import Biker from '../models/Biker'

// POST /biker
export const saveBiker = async (req, res) => {
  const { body, files } = req
  //TODO: guardar la foto en un servicio Cloud y almacenar el link en el obj
  try {
    const biker = new Biker(body)
    const savedUser = await biker.save()

    if (!savedUser)
      return res
        .status(403)
        .json({ success: false, message: 'Biker not saved !' })

    return res.status(200).json({
      success: true,
      message: 'Bikers All found!',
      biker: savedUser,
    })
  } catch (error) {
    console.log(error.message)
    console.log('sqlMessage')
    console.log(error.parent.sqlMessage)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
  }
}
// GET /biker
export const findAllBiker = async (req, res) => {
  try {
    const bikers = await Biker.findAll()
    if (!bikers)
      return res
        .status(404)
        .json({ success: false, message: 'Biker not found !' })

    return res.status(200).json({
      success: true,
      message: 'Bikers All found!',
      bikers,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
  }
}

// GET /biker:id
export const findOneBiker = async (req, res) => {
  const { params } = req
  try {
    const biker = await Biker.findByPk(params.id)
    if (!biker)
      return res
        .status(404)
        .json({ success: false, message: 'Biker not found !' })

    return res.status(200).json({
      success: true,
      message: 'Biker found!',
      id: params.id,
      biker,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
  }
}

// PUT /biker:id
export const updatedBiker = async (req, res) => {
  const { params, body } = req
  try {
    const biker = await Biker.findByPk(params.id)

    if (!biker)
      return res
        .status(404)
        .json({ success: false, message: 'Biker not found !' })

    const bikerUpdated = await biker.update(body)

    return res.status(200).json({
      success: true,
      message: 'Biker updated successfull !',
      id: params.id,
      biker: bikerUpdated,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
  }
}

// DELETE /biker:id
export const deletedBiker = async (req, res) => {
  const { params } = req
  try {
    const biker = await Biker.findByPk(params.id)

    if (!biker)
      return res
        .status(404)
        .json({ success: false, message: 'Biker not found !' })

     const bikerDeleted = await biker.destroy()

    return res.status(200).json({
      success: true,
      message: 'Biker Deleted successfull !',
      id: params.id,
      bikerDeleted,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
  }
}

import TypeBici from '../models/TypeBici'

export const findAllTypeBici = async (req, res) => {
  try {
    const dataTypeBici = await TypeBici.findAll()
    if (!dataTypeBici)
      return res
        .status(404)
        .json({ success: false, message: 'Type Bici not found !' })

    return res.status(200).json(dataTypeBici)
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

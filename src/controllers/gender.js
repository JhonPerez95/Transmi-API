import Genders from '../models/Genders'

export const findAllGenders = async (req, res) => {
  try {
    const dataGenders = await Genders.findAll()
    if (!dataGenders)
      return res
        .status(404)
        .json({ success: false, message: 'Genders not found !' })

    return res.status(200).json(dataGenders)
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

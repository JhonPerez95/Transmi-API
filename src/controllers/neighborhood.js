import Neighborhoods from '../models/Neighborhoods'

export const findAllNeighborhoods = async (req, res) => {
  try {
    const dataNeighborhoods = await Neighborhoods.findAll()
    if (!dataNeighborhoods)
      return res
        .status(404)
        .json({ success: false, message: 'Neighborhoods not found !' })

    return res.status(200).json(dataNeighborhoods)
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

// GET /api/parkings

import Parkings from '../models/Parkings'

export const findAllParkings = async (req, res) => {
  try {
    const dataParkings = await Parkings.findAll()
    if (!dataParkings)
      return res
        .status(404)
        .json({ success: false, message: 'Parkings  not found !' })

    return res.status(200).json(dataParkings)
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

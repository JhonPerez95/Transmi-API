import Levels from '../models/Levels'

export const findAllLevels = async (req, res) => {
  try {
    const dataLevels = await Levels.findAll()
    if (!dataLevels)
      return res
        .status(404)
        .json({ success: false, message: 'Levels not found !' })

    return res.status(200).json(dataLevels)
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

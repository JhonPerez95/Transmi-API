import Jobs from '../models/Jobs'

// GET api/jobs
export const findAllJobs = async (req, res) => {
  try {
    const dataJobs = await Jobs.findAll()
    if (!dataJobs)
      return res
        .status(404)
        .json({ success: false, message: 'Jobs not found !' })

    return res.status(200).json(dataJobs)
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

import TypeDocuments from '../models/TypeDocuments'

export const findAllTypeDocuments = async (req, res) => {
  try {
    const dataTypeDocuments = await TypeDocuments.findAll()
    if (!dataTypeDocuments)
      return res
        .status(404)
        .json({ success: false, message: 'Type Documents not found !' })

    return res.status(200).json(dataTypeDocuments)
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

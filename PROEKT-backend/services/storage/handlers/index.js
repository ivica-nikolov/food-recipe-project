
const DOCUMENTS_DIR = `${__dirname}/../../../../PROEKT - frontend/src/imageUploads`


const uploadImg = async (req, res) => {
    const fileName = req.files.image.name;
    const fileDirPath = `${DOCUMENTS_DIR}/${fileName}`;
    let fileTypes = ['image/png', 'image/jpg' , 'image/jpeg', 'image/svg'];
    try {
        
        if (!fileTypes.includes(req.files.image.mimetype)){
            return res.status(400).send('Error')
        }

        await req.files.image.mv(fileDirPath, (err) => {
            if(err) {
                return res.status(500).send('Image not saved.');
            }
        })
        return res.status(200).send('Image successfully saved');
    } catch (err) {
        return res.status(400).send('Image not saved');
    }
} 

const downlaodImg = async (req, res) => {
    try {
        imgPath = `${__dirname}/../../../../PROEKT - frontend/src/imageUploads/${req.params.file}`
        res.download(imgPath);
    } catch (err) {
        return res.status(500).send('Error')
    }
}

module.exports = {
    downlaodImg,
    uploadImg
}
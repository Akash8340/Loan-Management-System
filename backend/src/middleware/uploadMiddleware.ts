import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (
        req,
        file,
        cb
    ) => {
        cb(null, "uploads/");
    },

    filename: (
        req,
        file,
        cb
    ) => {
        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );
    }
});

const fileFilter = (
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {

    const allowed =
        [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];

    if (
        allowed.includes(
            file.mimetype
        )
    ) {
        cb(null, true);
    }
    else {
        cb(
            new Error(
                "Only PDF JPG PNG allowed"
            )
        );
    }
};

export default multer({
    storage,
    limits: {
        fileSize:
            5 * 1024 * 1024
    },
    fileFilter
});
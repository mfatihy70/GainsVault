const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    if (err.status) {
        return res.status(err.status).json({ msg: err.message });
    }
    // Server Error
    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        error: err.message
    });
}

export default errorHandler;
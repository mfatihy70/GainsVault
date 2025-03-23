const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.status) {
        return res.status(err.status).json({ msg: err.message });
    }
    res.status(404).json({ msg: err.message || "Something went wrong" });
}

export default errorHandler;
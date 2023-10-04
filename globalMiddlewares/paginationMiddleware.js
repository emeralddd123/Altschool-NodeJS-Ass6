const paginationMiddleware = (pageSize) => {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || pageSize;

            req.pagination = {
                page: page,
                limit: limit
            };
            console.log('inside page middlware')
            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = paginationMiddleware

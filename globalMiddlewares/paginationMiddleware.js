const paginationMiddleware = (pageSize) => {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parent(req.query.limit) || pageSize;

            req.pagination = {
                page: page,
                limit: limit
            };

            next();
        } catch (error) {
            next(error);
        }
    };
};

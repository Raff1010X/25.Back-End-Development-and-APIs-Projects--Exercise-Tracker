exports.createOne = (Model) => async (req, res, next) => {
    try {
        let doc = await Model.create(req.body);
        res.status(201).json(doc);
    } catch (err) {
        next(err);
    }
};

exports.getAll = (Model) => async (req, res, next) => {
    try {
        let doc = await Model.find();
        res.status(200).json(doc);
    } catch (err) {
        next(err);
    }
};

exports.getOne = (Model) => async (req, res, next) => {
    try {
        let doc = await Model.findOne({ _id: req.params._id });
        if (req.params._id) doc = doc.filterLogByQuery(req.query);
        res.status(200).json(doc);
    } catch (err) {
        next(err);
    }
};

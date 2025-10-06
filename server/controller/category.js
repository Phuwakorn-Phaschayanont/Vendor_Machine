exports.createCategory = async (req, res) => {
    try {
        res.send({ message: 'Create category route' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
};

exports.listCategory = async (req, res) => {
    try {
        res.send({ message: 'List category route' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        res.send({ message: 'Delete category route' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
};
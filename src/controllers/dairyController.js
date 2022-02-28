const Dairy = require("../models/Dairy");
exports.getDairy = async (req, res, next) => {
  try {
    const createdBy = req.user;
    const dairy = await Dairy.find({ createdBy }).select(
      "-createdBy -__v -updatedAt -createdAt"
    );
    if (!dairy) return res.status(401).send({ message: "No dairy found" });
    res.status(201).send({ dairy });
  } catch (err) {
    next(err, req, res, next);
  }
};
exports.getDairyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(401).send({ message: "id is required" });
    const dairy = await Dairy.findById(req.params.id).select(
      "-createdBy -__v -updatedAt -createdAt"
    );
    if (!dairy && dairy.createdBy !== id)
      return res.status(401).send({ message: "No dairy found" });
    res.status(201).send({ ...dairy });
  } catch (err) {
    next(err, req, res, next);
  }
};
exports.addDairy = async (req, res, next) => {
  try {
    const { content, subject, date } = req.body;
    if (!content || !subject || !date)
      return res
        .status(401)
        .send({ message: "content, subject and date are required" });
    await Dairy.create({
      content,
      subject,
      date,
      createdBy: req.user,
    });
    res.status(201).send({ message: "Dairy added successfully" });
  } catch (err) {
    next(err, req, res, next);
  }
};

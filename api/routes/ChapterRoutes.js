import express from "express";

import Chapter from "../models/ChapterInfo.js";
import Link from "../models/LinkInfo.js";

export const ChapterRouter = express.Router();

ChapterRouter.route("/")
  .get(async (req, res) => {
    const data = await Chapter.find().populate("links").exec();
    res.status(200).json({
      count: data.length,
      chapters: data,
    });
  })
  .post(async (req, res) => {
    const chapter = new Chapter({
      name: req.body.name,
      description: req.body.description,
      links: [],
    });
    const result = await chapter.save();
    res.status(201).json({
      msg: "Chapter created",
      createdChapter: {
        result,
      },
    });
  });

ChapterRouter.route("/:chapterId")
  .get(async (req, res) => {
    const { chapterId } = req.params;
    const data = await Chapter.findById(chapterId).populate("links").exec();
    if (data) res.status(200).json({ data });
    else res.status(404).json({ msg: "No valid chapter for given id" });
  })
  .delete(async (req, res) => {
    const { chapterId } = req.params;
    const data = await Chapter.remove({ _id: chapterId }).exec();
    res.status(200).json({ msg: "Chapter deleted" });
  });

ChapterRouter.route("/:chapterId/links")
  .get(async (req, res) => {
    const { chapterId } = req.params;
    const data = await Chapter.findById(chapterId).populate("links").exec();
    if (data) {
      const { links } = data;
      res.status(200).json({ links });
    } else {
      res.status(404).json({ msg: "Invalid chapter Id" });
    }
  })
  .post(async (req, res) => {
    const { chapterId } = req.params;
    const data = await Chapter.findById(chapterId).populate("links").exec();
    const link = new Link({
      description: req.body.description,
      url: req.body.url,
    });
    data.links = [link, ...data.links];
    const update = await Chapter.findByIdAndUpdate(chapterId, { $set: data });
  });

ChapterRouter.route("/:chapterId/links/:linkId")
  .get(async (req, res) => {
    const { linkId } = req.params;
    const link = await Link.findById(linkId).exec();
    if (link) {
      res.status(200).json({ link });
    } else {
      res.status(404).json({ msg: "Invalid link Id" });
    }
  })
  .delete(async (req, res) => {
    const { chapterId, linkId } = req.params;
    const data = await Chapter.findById(chapterId).exec();
    const link = new Link({
      description: req.body.description,
      url: req.body.url,
    });
    data.links = data.links.filter((item) => item._id !== linkId);
    const update = await Chapter.findByIdAndUpdate(chapterId, { $set: data });
  });
